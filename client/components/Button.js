import Link from "next/link";

export const Button = ({ label, href, onClick, disabled = false }) => {

  if (href !== undefined) {
    const enabledLinkStyle = "relative underline inline-flex items-center rounded-md border-transparent px-4 py-2 text-sm font-medium text-indigo-600 hover:bold focus:outline-none focus:bold focus:bold focus:ring-offset-2 cursor-pointer"
    const disabledLinkStyle = "relative underline inline-flex items-center rounded-md border-transparent px-4 py-2 text-sm font-medium text-gray-400 hover:bold focus:outline-none focus:bold focus:bold focus:ring-offset-2 cursor-pointer"
    const linkStyle = disabled ? disabledLinkStyle : enabledLinkStyle;

    return (
      <Link href={href} disabled={disabled}>
        <button
          disabled={disabled}
          type="button"
          className={linkStyle}
        >
          {label}
        </button>
      </Link>
    );
  }
  if (onClick !== undefined) {
    const enabledButtonStyle = "relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    const disabledButtonStyle = "relative inline-flex items-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    const linkStyle = disabled ? disabledButtonStyle : enabledButtonStyle;

    return (
      <button
        className={linkStyle}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    );
  }
};