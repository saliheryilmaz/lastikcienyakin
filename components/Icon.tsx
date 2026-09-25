export type IconName = 'phone' | 'whatsapp' | 'send' | 'chat' | 'pin' | 'arrow' | 'truck' | 'wheel' | 'tool' | 'shield' | 'check' | 'menu';
const paths: Record<IconName, React.ReactNode> = {
 whatsapp: <><path d="M20.5 11.6a8.6 8.6 0 0 1-12.8 7.5L3 20.5l1.4-4.6A8.6 8.6 0 1 1 20.5 11.6Z" strokeWidth="1.9"/><path d="M8.3 6.9c-.3 0-.7.2-.9.6-.8 1.1-.4 2.5.1 3.4 1.2 2.3 3.1 4 5.6 4.8 1 .3 2 .4 2.8-.2.4-.3.7-1.1.7-1.5 0-.2-.2-.3-.4-.4l-2-1c-.2-.1-.4-.1-.6.2l-.8 1c-.2.2-.4.2-.7.1-1.5-.6-2.7-1.7-3.4-3.1-.1-.3 0-.4.1-.6l.6-.8c.2-.2.2-.4.1-.6l-.9-2c-.1-.3-.3-.4-.5-.4h-.8Z" fill="currentColor" stroke="none"/></>,
 send: <path d="m21 3-7 18-4-7-7-4 18-7ZM10 14 21 3"/>,
 phone: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z"/>,
 chat: <path d="M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L3 21l1.4-4.8A9 9 0 1 1 21 11.5Z M8 9h8M8 13h5"/>,
 pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
 arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
 truck: <><path d="M2 5h12v12H2V5Zm12 5h5l3 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
 wheel: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5m0 8v5M3 12h5m8 0h5"/></>,
 tool: <path d="M14 3a6 6 0 0 0-6 8L3 16a3 3 0 0 0 5 5l5-6a6 6 0 0 0 8-7l-4 4-5-5 4-4h-2Z"/>,
 shield: <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Zm-4 10 3 3 5-6"/>,
 check: <path d="m5 12 4 4L19 6"/>,
 menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
};
export function Icon({name, className = ''}: {name: IconName; className?: string}) {return <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;}
