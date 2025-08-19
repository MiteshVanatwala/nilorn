const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Run the standard build first
console.log('Running standard build...');
execSync('npm run build', { stdio: 'inherit' });

// Get current date and time in YYYYMMDD_HHMMSS format
const now = new Date();
const date = now.toISOString()
    .replace(/[-:]/g, '')
    .replace('T', '_')
    .split('.')[0];

// Read the build/index.html file
const indexPath = path.join(__dirname, '../build/index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Add release date as a data attribute to the html tag
indexContent = indexContent.replace('<html', `<html data-release-date="${date}"`);

// Add cache-busting query parameter to all JS and CSS files
indexContent = indexContent.replace(/(?<=(src|href)=["'].*?\.)(js|css)["']/g, `$2?v=${date}"`);

// Write the modified content back
fs.writeFileSync(indexPath, indexContent);

// Create a web.config file for proper cache control
const webConfigContent = `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <staticContent>
            <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" />
        </staticContent>
        <rewrite>
            <rules>
                <rule name="Caching">
                    <match url=".*\\.(js|css|jpg|jpeg|png|gif|ico)$" />
                    <conditions>
                        <add input="{QUERY_STRING}" pattern="v=" />
                    </conditions>
                    <serverVariables>
                        <set name="RESPONSE_Cache-Control" value="public, max-age=31536000" />
                    </serverVariables>
                </rule>
                <rule name="Html Files">
                    <match url=".*\\.html$" />
                    <action type="Rewrite" url="{R:0}" />
                    <serverVariables>
                        <set name="RESPONSE_Cache-Control" value="no-cache, no-store, must-revalidate" />
                        <set name="RESPONSE_Pragma" value="no-cache" />
                        <set name="RESPONSE_Expires" value="0" />
                    </serverVariables>
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>`;

fs.writeFileSync(path.join(__dirname, '../build/web.config'), webConfigContent);

// Rename all .js and .css files to include the date
const buildDir = path.join(__dirname, '../build');

function addDateToFiles(dir) {
    const files = fs.readdirSync(dir);
    const fileMap = new Map(); // Store old name to new name mapping
    
    // First pass: rename all JS and CSS files and store the mappings
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            addDateToFiles(filePath); // Recurse into subdirectories
        } else if ((file.endsWith('.js') || file.endsWith('.css')) && !file.endsWith('.map')) {
            // Don't rename files that already have a hash
            if (!file.includes('.')) return;
            
            const ext = path.extname(file);
            const basename = path.basename(file, ext);
            if (!basename.includes(date)) {
                const newName = `${basename}.${date}${ext}`;
                fs.renameSync(filePath, path.join(dir, newName));
                fileMap.set(file, newName);
                
                // Update references in index.html if needed
                indexContent = indexContent.replace(
                    new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                    newName
                );
            }
        }
    });
    
    // Second pass: handle map files and update their contents
    files.forEach(file => {
        if (file.endsWith('.map')) {
            const filePath = path.join(dir, file);
            const mapContent = fs.readFileSync(filePath, 'utf8');
            let updatedMapContent = mapContent;
            
            // Get the corresponding JS/CSS file name
            const sourceFile = file.replace('.map', '');
            if (fileMap.has(sourceFile)) {
                const newSourceFile = fileMap.get(sourceFile);
                const newMapName = newSourceFile + '.map';
                
                // Update the sourceMappingURL in the source file if it exists
                const sourceFilePath = path.join(dir, fileMap.get(sourceFile));
                if (fs.existsSync(sourceFilePath)) {
                    let sourceContent = fs.readFileSync(sourceFilePath, 'utf8');
                    sourceContent = sourceContent.replace(
                        new RegExp(`sourceMappingURL=${file}`),
                        `sourceMappingURL=${newMapName}`
                    );
                    fs.writeFileSync(sourceFilePath, sourceContent);
                }
                
                // Update the "file" field in the map file
                try {
                    const mapJson = JSON.parse(updatedMapContent);
                    if (mapJson.file) {
                        mapJson.file = newSourceFile;
                        updatedMapContent = JSON.stringify(mapJson);
                    }
                } catch (e) {
                    console.warn('Warning: Could not parse source map JSON:', e);
                }
                
                // Write updated map content and rename the map file
                fs.writeFileSync(filePath, updatedMapContent);
                fs.renameSync(filePath, path.join(dir, newMapName));
            }
        }
    });
}

addDateToFiles(path.join(buildDir, 'static'));

// Write the updated index.html with new file references
fs.writeFileSync(indexPath, indexContent);

console.log(`Build completed with release date: ${date}`);
