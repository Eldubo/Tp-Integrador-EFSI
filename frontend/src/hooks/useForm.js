import { useState } from 'react';

export const useForm = (initialValues = {}) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return { form, handleChange };
};