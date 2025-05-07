import { useTranslation } from 'react-i18next';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import type { ClientDto } from '../../../app/generate/models/ClientDto';
import { useEffect } from 'react';
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

  //WYSIWYG editor
  const { setValue, watch } = useFormContext<ClientDto>();
  const requirement = watch('requirement');
  // Update content when client changes
  useEffect(() => {
    if (client?.requirement) {
      setValue('requirement', client.requirement);
    }
  }, [client, setValue]);

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };
  //end WYSIWYG editor

  return (
    <AccordionItem title={`${t('Client.AccordionLabels.Requirements')}`}>
      <div className="quill-container" style={{ minHeight: '200px' }}>
        <ReactQuill
          theme="snow"
          value={requirement || ''}
          modules={modules}
          readOnly={disableEdit}
          onChange={newContent => {
            setValue('requirement', newContent, {
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        />
      </div>
    </AccordionItem>
  );
};
export default ClientSourcingSection;
