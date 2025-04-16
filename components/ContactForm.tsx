import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form submitted:', data);
    // Simulate sending data...
    reset(); // Clear form on successful submit
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '1rem' }}>
      <h2>Contact Us</h2>
      {isSubmitSuccessful && <p style={{ color: 'green' }}>Message sent successfully!</p>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label><br />
          <input
            {...register('name', { required: 'Name is required' })}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label><br />
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        {/* Message Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label>Message:</label><br />
          <textarea
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message should be at least 10 characters long',
              },
            })}
            rows={5}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          {errors.message && <p style={{ color: 'red' }}>{errors.message.message}</p>}
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
