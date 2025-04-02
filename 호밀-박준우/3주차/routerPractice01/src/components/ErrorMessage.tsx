type Props = {
    message: string;
};

const ErrorMessage = ({ message }: Props) => {
    return (
        <div className="flex justify-center items-center h-96">
            <div className="text-red-500 text-lg font-semibold">{message}</div>
        </div>
    );
};

export default ErrorMessage;
