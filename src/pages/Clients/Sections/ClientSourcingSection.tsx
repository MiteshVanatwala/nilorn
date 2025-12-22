import { useTranslation } from 'react-i18next';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import type { ClientDto } from '../../../app/generate/models/ClientDto';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useFormContext } from 'react-hook-form';

type Props = {
  disableEdit?: boolean;
  client?: ClientDto;
};

const ClientSourcingSection = ({
  disableEdit = false,
  client = undefined,
}: Props) => {
  const { t } = useTranslation();

  const { setValue, watch } = useFormContext<ClientDto>();
  const requirement = watch('requirement');

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ['small', false, 'large'] }],
      ['bold', 'italic', 'underline', 'strike'], // strikethrough
      [{ color: [] }, { background: [] }], // font color and highlight
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'], // insert link
      ['clean'], // remove formatting
    ],
  };
  //end WYSIWYG editor

  return (
    <AccordionItem title={`${t('Client.AccordionLabels.Requirements')}`}>
      <div className="quill-container" style={{ height: 200 }}>
        <ReactQuill
          theme="snow"
          value={requirement || ''}
          modules={modules}
          readOnly={disableEdit}
          onKeyUp={e => {
            setValue('requirement', requirement, {
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
          onChange={(newContent: any) => {
            setValue('requirement', newContent, {
              shouldDirty: false,
              shouldTouch: false,
            });
          }}
          style={{
            height: 'calc(100% - 40px)',
          }}
        />
      </div>
    </AccordionItem>
  );
};
export default ClientSourcingSection;
