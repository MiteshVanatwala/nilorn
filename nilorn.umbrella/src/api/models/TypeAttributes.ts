/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export enum TypeAttributes {
    NOT_PUBLIC = 'notPublic',
    PUBLIC = 'public',
    NESTED_PUBLIC = 'nestedPublic',
    NESTED_PRIVATE = 'nestedPrivate',
    NESTED_FAMILY = 'nestedFamily',
    NESTED_ASSEMBLY = 'nestedAssembly',
    NESTED_FAM_ANDASSEM = 'nestedFamANDAssem',
    NESTED_FAM_ORASSEM = 'nestedFamORAssem',
    SEQUENTIAL_LAYOUT = 'sequentialLayout',
    EXPLICIT_LAYOUT = 'explicitLayout',
    LAYOUT_MASK = 'layoutMask',
    INTERFACE = 'interface',
    ABSTRACT = 'abstract',
    SEALED = 'sealed',
    SPECIAL_NAME = 'specialName',
    RT_SPECIAL_NAME = 'rtSpecialName',
    IMPORT = 'import',
    SERIALIZABLE = 'serializable',
    WINDOWS_RUNTIME = 'windowsRuntime',
    UNICODE_CLASS = 'unicodeClass',
    AUTO_CLASS = 'autoClass',
    CUSTOM_FORMAT_CLASS = 'customFormatClass',
    HAS_SECURITY = 'hasSecurity',
    RESERVED_MASK = 'reservedMask',
    BEFORE_FIELD_INIT = 'beforeFieldInit',
    CUSTOM_FORMAT_MASK = 'customFormatMask',
}
