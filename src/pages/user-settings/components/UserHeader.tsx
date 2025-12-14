import {Settings, User} from "lucide-react";

interface UserHeaderProps {
    name: string;
    role: string;
    avatarUrl?: string;
    onSettingsClick?: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, role, avatarUrl, onSettingsClick }) => {
    return (
        <header className="flex h-40 items-start gap-5 px-12 py-9 bg-snow border-b shadow-sm">
            <div className="flex items-center justify-center w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                {avatarUrl ? (
                    <img src={avatarUrl} alt={`Foto de perfil de ${name}`} className="w-full h-full object-cover" />
                ) : (
                    <User className="w-12 h-12 text-gray-400" />
                )}
            </div>

            <div className="flex flex-col justify-center flex-1 gap-1">
                <div className="font-['Arial_Rounded_MT_Bold'] text-[#ffcc4d] text-3xl">
                    Hola,
                </div>
                <h1 className="font-['Open_Sans'] text-neutral-800 text-xl">
                    {name}
                </h1>
                <p className="font-['Open_Sans'] font-extrabold text-neutral-800 text-sm">
                    {role}
                </p>
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