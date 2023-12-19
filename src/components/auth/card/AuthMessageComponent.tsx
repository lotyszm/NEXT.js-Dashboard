import { cn } from '@/lib/utils';

type AuthMessageComponentProps = {
  message: string;
  type: 'success' | 'error';
};

const AuthMessageComponent = (props: AuthMessageComponentProps) => {
  const { message, type } = props;
  return (
    <div
      className={cn(
        'relative mb-8 w-full rounded border-0 p-3 shadow',
        type === 'success' ? 'bg-green-100' : '',
        type === 'error' ? 'bg-red-100' : ''
      )}
    >
      {message}
    </div>
  );
};

export { AuthMessageComponent };
