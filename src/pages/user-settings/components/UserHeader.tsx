import {Settings, User} from "lucide-react";

interface UserHeaderProps {
    name: string;
    role: string;
    avatarUrl?: string;
    onSettingsClick?: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, role, avatarUrl, onSettingsClick }) => {
    return (
        <header className="flex h-40 h-min-fit items-start gap-5 py-8 p-5 lg:px-12 lg:py-9 bg-snow border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-center w-1/5 lg:w-1/12 h-full">
                <div className="flex items-center justify-center w-full max-w-16 max-h-16 rounded-full overflow-hidden bg-gray-200">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={`Foto de perfil de ${name}`} className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-full h-full text-gray-400" />
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-center flex-1 gap-1">
                <h1 className="text-neutral-800 text-xl lg:text-3xl leading-tight">
                    Hola,
                </h1>
                <h1 className="text-neutral-800 text-lg lg:text-xl leading-[1.15]">
                    {name}
                </h1>
                <h5 className="font-extrabold text-neutral-600 text-sm">
                    {role}
                </h5>
            </div>

            <button
                className="w-6 h-6 text-neutral-800 hover:opacity-70 transition-opacity"
                aria-label="Configuración"
                onClick={onSettingsClick}
            >
                <Settings className="w-full h-full" />
            </button>
        </header>
    );
};

export default UserHeader;