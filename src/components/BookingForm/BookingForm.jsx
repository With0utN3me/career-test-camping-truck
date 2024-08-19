import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { Formik, Form, Field } from 'formik';
import css from './BookingForm.module.css';

const initialValues = {
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name is too short!')
        .max(50, 'Name is too long!')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    bookingDate: Yup.date()
        .required('Booking date is required')
        .nullable(),
    comment: Yup.string()
        .max(500, 'Comment is too long!')
        .optional(),
});

const BookingForm = () => {

    const handleSubmit = (values, actions) => {
        console.log(values);
        window.location.reload();
        actions.resetForm(); 
    };

    const nameFieldId = nanoid();
    const emailFieldId = nanoid();
    const bookingDateFieldId = nanoid();
    const commentFieldId = nanoid();

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ errors, touched }) => (
                <Form className={css['modal-form']}>
                    <div className={css['title-p-wrap']}>
                        <h3 className={css['form-title']}>Book your campervan now</h3>
                        <p className={css['form-p']}>Stay connected! We are always ready to help you.</p>
                    </div>
                    <div className={css['inputs-wrap']}>
                        <div className={css['input-wrapper']}>
                            <Field
                                className={`${css['form-field']} ${touched.name && errors.name ? css['error-input'] : ''}`}
                                type="text"
                                name="name"
                                id={nameFieldId}
                                placeholder="Name"
                            />
                            {touched.name && errors.name && (
                                <div className={css['error-message']}>{errors.name}</div>
                            )}
                        </div>

                        <div className={css['input-wrapper']}>
                            <Field
                                className={`${css['form-field']} ${touched.email && errors.email ? css['error-input'] : ''}`}
                                type="email"
                                name="email"
                                id={emailFieldId}
                                placeholder="Email"
                            />
                            {touched.email && errors.email && (
                                <div className={css['error-message']}>{errors.email}</div>
                            )}
                        </div>

                        <div className={css['input-wrapper']}>
                            <Field
                                className={`${css['form-field']} ${touched.bookingDate && errors.bookingDate ? css['error-input'] : ''}`}
                                type="date"
                                name="bookingDate"
                                id={bookingDateFieldId}
                                placeholder="Booking date"
                            />
                            {touched.bookingDate && errors.bookingDate && (
                                <div className={css['error-message']}>{errors.bookingDate}</div>
                            )}
                        </div>

                        <div className={css['input-wrapper']}>
                            <Field
                                className={`${css['form-text-area']} ${touched.comment && errors.comment ? css['error-input'] : ''}`}
                                as="textarea"
                                name="comment"
                                id={commentFieldId}
                                placeholder="Comment"
                            />
                            {touched.comment && errors.comment && (
                                <div className={css['error-message']}>{errors.comment}</div>
                            )}
                        </div>

                    </div>
                    <button className={css['submit-button']} type="submit">Send</button>
                </Form>
            )}
        </Formik>
    );
};

export default BookingForm;