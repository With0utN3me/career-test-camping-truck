import Modal from 'react-modal';
import PropTypes from 'prop-types';
import css from './AdvertModal.module.css';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(17, 18, 19, 0.4)'
    },
    content: {
        width: '982px',
        height: '720px',
        backgroundColor: '#fff',
        margin: '40px, auto',
        borderRadius: '20px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        justifyContent: 'center',
        alignItems: 'baseline',
    }
};

Modal.setAppElement('#root');

export const AdvertModal = ({ isOpen, onRequestClose, advert, handleExit }) => {



    const handleSubmit = () => {
        onRequestClose();
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Advertisement modal"
        >

        
        </Modal>
    );
};

AdvertModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    advert: PropTypes.object.isRequired, 
    handleExit: PropTypes.func.isRequired,
};