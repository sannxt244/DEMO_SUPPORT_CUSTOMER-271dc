'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface ChatUser {
  FullName: string;
  AmisID: string;
  AvatarUrl?: string;
}

interface UserSelectorProps {
  users: ChatUser[];
  value?: string;
  onChange: (user: ChatUser) => void;
}

export default function UserSelector({
  users,
  value,
  onChange,
}: UserSelectorProps) {
  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {users.map((user) => {
        const selected = value === user.AmisID;

        return (
          <div
            key={user.AmisID}
            onClick={() => onChange(user)}
            className={cn(
              'flex cursor-pointer items-center gap-3 p-3 transition',
              'hover:bg-muted',
              selected && 'border-blue-500 bg-blue-50'
            )}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.AvatarUrl} />

              <AvatarFallback>
                {user.FullName
                  ?.split(' ')
                  .slice(-1)[0]
                  .charAt(0)}
              </AvatarFallback>
            </Avatar>


            <div className="flex-1 overflow-hidden">
              <div className="truncate font-medium">
                {user.FullName}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
