import React, { useState, useRef } from 'react';
import { Typography } from './stories/typography';
import { Button } from './stories/button'
import { Modal } from './stories/modal'
import './styles.css';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const openModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    openModalButtonRef.current?.focus();
  };

  return (
    <main className="main" role="main">
      <Typography variant='h1' dataTestIdPrefix='heading'>NewDay</Typography>
      <Typography variant='h2'>Let's see a modal</Typography>

      <Button onClick={handleOpenModal} aria-label="Open Modal" buttonRef={openModalButtonRef}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="large" aria-labelledby={'ariaLabelledBy'}>
        <Typography variant='h2' id='ariaLabelledBy' ariaLabel='Helping people move forward with credit'>
          Helping people move forward with credit
        </Typography>
        <Typography variant='p' ariaLabel='We provide responsible access to credit through a number of tailored brands'>
          We design and deploy products to meet evolving consumer needs. We create value for our partners through our capability. The NewDay platform is highly scalable, brand agnostic and offers product flexibility. We provide responsible access to credit through a number of tailored brands.
        </Typography>
        <Button size='medium' variant='secondary' onClick={handleCloseModal} aria-label="Close">Close</Button>
      </Modal>
    </main>
  );
}

export default App;
