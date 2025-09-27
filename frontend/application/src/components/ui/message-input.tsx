import { SendIcon } from "lucide-react";
import { useState } from "react";

type Props = {
    onSubmit: (value: string) => void;
};

export const MessageInput = ({
    onSubmit,
}: Props) => {
    const [value, setValue] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="fixed bottom-4 inset-x-4 sm:inset-x-6 lg:inset-x-8 z-10 max-w-3xl mx-auto">
                    <input
                        className="w-full bg-white/80 backdrop-blur-sm h-12 border border-gray-200 hover:border-gray-600 rounded-full px-8 transition-all duration-300 focus:outline-rose-500"
                        type="text"
                        value={value}
                        onChange={handleChange}
                    />
                    <button
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 rounded-full flex items-center justify-center bg-rose-500 text-white cursor-pointer transition-all duration-300"
                        type="submit"
                    >
                        <SendIcon className="flex-none size-5" />
                    </button>
            </div>
        </form>
    )
}
