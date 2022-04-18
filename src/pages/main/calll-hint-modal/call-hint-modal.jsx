import React from 'react';
import './call-hint-modal.module.scss';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';

const CallHintModal = (props) => {
  return (
    <Dialog fullWidth maxWidth="sm" onClose={props.onClose} open={props.open}>
      <DialogTitle>Подсказка Друга</DialogTitle>
      <DialogContent>
        <p>
          Ваш друг говорит: "Так хочется потянуть резину, но это же элементарно! Как такой вопрос мог поставить тебя в
          тупик? Правильный ответ "{props.rightAnswer}"!
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CallHintModal;
