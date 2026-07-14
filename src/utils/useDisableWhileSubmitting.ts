import {useCallback, useState} from 'react';

export const useDisableWhileSubmitting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const run = useCallback(
    async (callback: () => Promise<void>) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        await callback();
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting],
  );

  const getDisabledState = () => isSubmitting;

  return {run, getDisabledState};
};
