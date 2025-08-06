import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const resetForm = () => {
    setForm(initialState);
  };

  return { form, handleChange, resetForm, setForm };
};