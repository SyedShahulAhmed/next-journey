"use client";
import { useState } from "react";

type Values = Record<string, any>;
type Errors = Record<string, string>;

export const useForm = (
  initialValues: Values,
  validate: (values: Values) => Errors,
  asyncValidate?: (values: Values) => Promise<Errors>,
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const setFieldValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name: string, value: any) => {
    const newErrors = validate({ ...values, [name]: value });
    setErrors((prev) => ({
      ...prev,
      [name]: newErrors[name] || "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    validateField(name, values[name]);
  };

  const runValidation = async () => {
    const syncErrors = validate(values);

    if (asyncValidate) {
      setIsValidating(true);
      const asyncErrors = await asyncValidate(values);
      setIsValidating(false);
      return { ...syncErrors, ...asyncErrors };
    }

    return syncErrors;
  };

  const handleSubmit =
    (onSubmit: (values: Values) => void) => async (e: React.FormEvent) => {
      e.preventDefault();

      const newErrors = await runValidation();
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setIsSubmitting(true);

        setTimeout(() => {
          onSubmit(values);
          setIsSubmitting(false);
        }, 1000);
      }
    };

  const isValid =
    Object.values(errors).every((e) => !e) &&
    Object.values(values).every((v) => v !== "");

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const getFieldProps = (name: string) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValidating,
    isValid,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    reset,
  };
};
