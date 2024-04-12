import { Box, Grid, GridItem } from '@chakra-ui/layout';
import ContentSection from '../../Templates/ContentSection';
import { COLORS, GRID } from '../../../theme/Constants';
import ArrowLink from '../../../components/Link/ArrowLink';
import { useProductDevelopmentNavigation } from '../../../app/api/productDevelopment';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import LeavePageModal, {
  ModalRef,
} from '../../../components/Modal/LeavePageModal';
import { ModalContext } from '../../../app/context/ModalContext';
import { useUnsavedChanges } from '../../../app/hooks/useUnsavedChanges';
import { useFormContext } from 'react-hook-form';

type Props = {
  no: string;
};
const BottomSection = ({ no }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useFormContext();

  const modalRef = useRef<ModalRef>(null);

  const [pendingProductDevelopmentNo, setPendingProductDevelopmentNo] =
    useState<string>();
  const { data } = useProductDevelopmentNavigation(no);

  const { close, setPreventClose } = useContext(ModalContext);
  const { discardChanges, setUnsavedChanges, hasUnsavedChanges } =
    useUnsavedChanges();

  useEffect(() => {
    setUnsavedChanges(form.formState.isDirty);
    setPreventClose(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  useEffect(() => {
    setPendingProductDevelopmentNo(undefined);
  }, [no]);

  const openLeavePageModal = () => {
    modalRef.current?.onOpen();
  };

  const onNavigate = (productDevelopmentNo: string) => {
    setPendingProductDevelopmentNo(productDevelopmentNo);
    console.log('hello');

    if (hasUnsavedChanges()) {
      openLeavePageModal();
      setPendingProductDevelopmentNo(productDevelopmentNo);
    } else {
      navigate(`/product-development/${productDevelopmentNo}`);
    }
  };

  return (
    <>
      <LeavePageModal
        ref={modalRef}
        onConfirm={() => {
          setPreventClose(false);
          modalRef.current?.onClose();
          discardChanges();
          if (pendingProductDevelopmentNo) {
            onNavigate(pendingProductDevelopmentNo);
          } else {
            close();
          }
        }}
      />

      <Box
        position={'sticky'}
        bgColor={COLORS.WHITE}
        bottom={0}
        left={0}
        right={0}
        zIndex={99}
        borderTop={`solid 1px ${COLORS.GRAY[10]}`}>
        <ContentSection>
          <Grid justifyContent={'space-between'} display={'flex'} py={GRID.GAP}>
            <GridItem>
              {data?.previous && (
                <ArrowLink
                  direction={'left'}
                  onClick={() => {
                    if (data?.previous) {
                      onNavigate(data.previous);
                    }
                  }}>
                  <>{t('Common.Previous')}</>
                </ArrowLink>
              )}
            </GridItem>
            <GridItem>
              {data?.next && (
                <ArrowLink
                  direction={'right'}
                  onClick={() => {
                    if (data?.next) {
                      onNavigate(data.next);
                    }
                  }}>
                  <>{t('Common.Next')}</>
                </ArrowLink>
              )}
            </GridItem>
          </Grid>
        </ContentSection>
      </Box>
    </>
  );
};

export default BottomSection;
