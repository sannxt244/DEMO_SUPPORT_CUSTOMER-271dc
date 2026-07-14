'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function HomePage() {
  const [env, setEnv] = useState('testonline1');
  const [sessionId, setSessionId] = useState('');

  const sessionIdError = useMemo(() => {
    const value = sessionId.trim();

    if (!value) {
      return 'Session ID không được để trống';
    }

    // Session ID là chuỗi hex 64 ký tự
    if (!/^[a-fA-F0-9]{64}$/.test(value)) {
      return 'Session ID phải là chuỗi hex gồm 64 ký tự';
    }

    return '';
  }, [sessionId]);

  const chatUrl = useMemo(() => {
    return `/bubble-chat/${env}?sid=${encodeURIComponent(
      sessionId.trim()
    )}`;
  }, [env, sessionId]);

  const handleOpen = () => {
    if (sessionIdError) return;

    window.open(chatUrl, '_blank');
  };

  const handleCopy = async () => {
    if (sessionIdError) return;

    await navigator.clipboard.writeText(chatUrl);
  };

  return (
    <div className="mx-auto mt-10 max-w-xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">AMIS Chat Demo</h1>

      <div className="space-y-2">
        <label className="text-sm font-medium">Môi trường</label>

        <Select value={env} onValueChange={setEnv}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="testonline1">
              Test Online 1
            </SelectItem>
            <SelectItem value="testonline2">
              Test Online 2
            </SelectItem>
            <SelectItem value="production1">
              Production 1
            </SelectItem>
            <SelectItem value="production2">
              Production 2
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Session ID</label>

        <Input
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          placeholder="Nhập Session ID..."
          className={sessionIdError ? 'border-destructive' : ''}
        />

        {sessionIdError && (
          <p className="text-sm text-destructive">
            {sessionIdError}
          </p>
        )}
      </div>

      <div className="space-y-2 rounded-lg border p-4">
        <div className="text-sm font-medium">URL</div>

        <code className="block break-all rounded bg-muted p-2 text-sm">
          {chatUrl}
        </code>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleOpen}
          disabled={!!sessionIdError}
        >
          Open
        </Button>

        <Button
          variant="outline"
          onClick={handleCopy}
          disabled={!!sessionIdError}
        >
          Copy URL
        </Button>
      </div>
    </div>
  );
}
