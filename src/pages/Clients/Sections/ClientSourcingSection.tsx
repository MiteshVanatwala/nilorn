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
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
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
            const cleanContent =
              requirement === '<p><br></p>' ? '' : requirement;
            setValue('requirement', cleanContent, {
              shouldDirty: true,
              shouldTouch: false,
            });
          }}
          onChange={(newContent: any) => {
            const cleanContent =
              requirement === '<p><br></p>' ? '' : requirement;
            setValue('requirement', cleanContent, {
              shouldDirty: false,
              shouldTouch: true,
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
