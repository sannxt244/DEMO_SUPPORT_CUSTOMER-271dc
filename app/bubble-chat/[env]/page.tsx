import BubbleChat from './bubble-chat';
import ContextMessageForm from './context-message-form';
import { EnvironmentKey, environments } from './environments';

interface Props {
    params: Promise<{
        env: string;
    }>;

    searchParams: Promise<{
        sid?: string;
    }>;
}

export default async function Page({ params, searchParams }: Props) {
    const { env } = await params;
    const { sid } = await searchParams;

    const config = environments[env as EnvironmentKey];

    if (!config) {
        return <div>Environment không tồn tại</div>;
    }

    if (!sid) {
        return <div>Thiếu session id</div>;
    }

    return (
        <>
            <BubbleChat env={env} sid={sid} script={config.script} />
            <ContextMessageForm />
        </>
    );
}
