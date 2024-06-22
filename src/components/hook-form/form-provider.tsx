import { log } from 'console';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: any;
};

export default function FormProvider({ children, onSubmit, methods }: Props) {
  console.log(onSubmit, 'onsubmit');

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
