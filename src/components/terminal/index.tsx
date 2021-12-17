import React, { useCallback, useEffect, useState } from 'react';
import { TerminalService } from 'Services/terminal';
import { Input } from './input';
import { Wrapper } from './styles/wrapper';
import { nanoid } from 'nanoid';
import { Log } from './interfaces/log';
import { Block } from './styles/block';

export const Terminal: React.FC = () => {
  const [log, setLog] = useState<Log[]>([]);
  useEffect(() => TerminalService.init(), []);

  const execute = useCallback(
    (str: string) => {
      const output = TerminalService.parse(str);
      setLog([
        ...log,
        { id: nanoid(), value: `$ ${str}` },
        ...output.map((value) => ({ id: nanoid(), value })),
      ]);
    },
    [setLog, log]
  );
  const onClick = useCallback((evt: React.SyntheticEvent<HTMLDivElement>) => {
    const { target } = evt;
    if (target instanceof HTMLDivElement) {
      const input = target.getElementsByTagName('input')[0];
      input.focus();
    }
  }, []);

  return (
    <Wrapper onClick={onClick}>
      {log.map((item) => (
        <Block key={item.id}>{item.value}</Block>
      ))}
      <Input execute={execute} />
    </Wrapper>
  );
};
