'use client';

import Link from 'next/link';
import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';

const Loader = ({ text = 'Processing...' }: { text?: string }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <div className='text-green-400'>{text}{dots}</div>;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface OutputProps {
  children: React.ReactNode;
}

const Output: React.FC<OutputProps> = ({ children }) => {
  return <div className='text-white'>{children}</div>;
};

interface HistoryProps {
  history: React.ReactNode[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div>
      {history.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

interface InputLineProps {
  input: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onInputKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const InputLine: React.FC<InputLineProps> = ({ input, onInputChange, onInputKeyDown, inputRef }) => {
  return (
    <div className='flex flex-row space-x-2'>
      <label htmlFor='prompt' className='flex-shrink text-green-400'>{'>'}</label>
      <input
        ref={inputRef}
        id='prompt'
        type='text'
        className='flex-grow bg-transparent text-white focus:outline-none'
        value={input}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        autoFocus
      />
    </div>
  );
};

const WelcomeMessage = () => (
  <div className='text-gray-400'>
    <p>Welcome to my interactive resume.</p>
    <p>Type &#39;help&#39; to see a list of available commands.</p>
  </div>
);

const Terminal = () => {
  const [history, setHistory] = useState<React.ReactNode[]>([<WelcomeMessage key='welcome' />]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    const terminalElement = terminalRef.current;
    terminalElement?.addEventListener('click', handleClick);
    return () => {
      terminalElement?.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = async (command: string): Promise<React.ReactNode> => {
    const [cmd] = command.toLowerCase().split(' ');

    if (cmd !== 'help') {
      await delay(Math.random() * 400 + 2000);
    }

    switch (cmd) {
      case 'help':
        return 'Available commands: about, skills, projects, contact, clear';

      case 'about':
        return 'Beep boop beep... I\'m a web developer from the time-space continuum. I specialize in taming state and soothing browser tantrums. My logs indicate a high probability of culture fit. Ready to execute interview.sh — let\'s set the coordinates (time/place).';

      case 'skills':
        return (
          <div>
            <p className='text-green-400'>{'//-- PRIMARY_WEAPONS'}</p>
            <ul className='list-disc list-inside pl-2'>
              <li>Dual-wielding React & TypeScript for precise, scalable attacks</li>
              <li>Next.js for swift, server-side strikes</li>
              <li>Modern HTML & CSS incantations (Tailwind, Sass, Grid & Flexbox)</li>
              <li>Node.js for powerful backend sorcery</li>
            </ul>

            <p className='mt-2 text-green-400'>{'//-- DEFENSIVE_MANEUVERS'}</p>
            <ul className='list-disc list-inside pl-2'>
              <li>Bulletproof armor via Jest Testing Library</li>
              <li>Fortifying defenses with WCAG 2.2 Accessibility standards</li>
              <li>Performance-tuning spells for healthy Core Web Vitals</li>
            </ul>

            <p className='mt-2 text-green-400'>{'//-- DEMON_TAMING_ARTS'}</p>
            <ul className='list-disc list-inside pl-2'>
              <li>Potions for state-chaos: Zustand, Redux Toolkit, TanStack Query</li>
              <li>Soothing incantations for Safari&#39;s infamous tantrums</li>
            </ul>

            <p className='mt-2 text-green-400'>{'//-- ARCANE_KNOWLEDGE_&_LOGISTICS'}</p>
            <ul className='list-disc list-inside pl-2'>
              <li>Siegecraft: Docker & CI/CD pipelines</li>
              <li>Cartography: Monorepo management (Turborepo, pnpm)</li>
              <li>Ancient Runes: Server Side Rendering & Static Site Generation</li>
              <li>Scrying: AI & Prompt Engineering</li>
            </ul>
          </div>
        );

      case 'projects':
        return (
          <div>
            <div className='mt-2'>
              <p className='text-green-400'>{'//-- MISSION: The SIT Toolkit Overhaul --//'}</p>
              <p className='pl-2'>Objective: Refactor and document a critical internal toolkit to improve developer workflow and code quality across the team.</p>
              <ul className='list-disc list-inside pl-4'>
                <li>Authored the toolkit&#39;s first comprehensive documentation.</li>
                <li>Overhauled the ESLint configuration, fixing widespread linting and type errors.</li>
                <li>Resolved critical dependency conflicts to stabilize the build process.</li>
              </ul>
            </div>

            <div className='mt-2'>
              <p className='text-green-400'>{'//-- MISSION: The Unicron Refactor --//'}</p>
              <p className='pl-2'>Objective: Drove significant improvements to the refactoring of a core internal tool (Prima {'>'} Supra), significantly improving its maintainability and future scalability.</p>
              <ul className='list-disc list-inside pl-4'>
                <li>Identified and fixed around 150 of previously missed type errors.</li>
                <li>Established a higher standard for code quality for the project going forward.</li>
              </ul>
            </div>

            <div className='mt-2'>
              <p className='text-green-400'>{'//-- MISSION: The Monorepo Initiative --//'}</p>
              <p className='pl-2'>Objective: Improve CI/CD processes by contributing to shared tooling and advocating for modern development practices.</p>
              <ul className='list-disc list-inside pl-4'>
                <li>Contributed a PR to an external GitHub Action to add monorepo support.</li>
                <li>Initiated knowledge-sharing meetings on EKS and AWS services.</li>
                <li>Actively expanding cloud expertise through advanced AWS courses (IAM, EC2, Route 53).</li>
              </ul>
            </div>

            <p className='mt-4'>
              For a full list of declassified public projects, access my GitHub profile:{' '}
              <Link
                className='text-green-400 underline hover:text-green-300'
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/sunny-github-acc'
              >
                github.com/sunny-github-acc
              </Link>
            </p>
          </div>
        );

      case 'contact':
        return (
          <div>
            <p>Secure channel open. You can reach me via the following protocols:</p>
            <div className='mt-2 pl-2 space-y-1'>
              <div className='flex items-center space-x-2'>
                <span className='text-green-400 w-30'>[Comms]:</span>
                <Link
                  className='text-green-400 underline hover:text-green-300'
                  href='mailto:karolis.kazak@gmail.com'
                >
                  karolis.kazak@gmail.com
                </Link>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-green-400 w-30'>[Dossier]:</span>
                <Link
                  className='text-green-400 underline hover:text-green-300'
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.linkedin.com/in/karolis-kaz/'
                >
                  linkedin.com/in/karolis-kaz
                </Link>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-green-400 w-30'>[Arsenal]:</span>
                <Link
                  className='text-green-400 underline hover:text-green-300'
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://github.com/sunny-github-acc'
                >
                  github.com/sunny-github-acc
                </Link>
              </div>
            </div>
          </div>
        );

      case 'clear':
        return 'clear';

      default:
        return `Command not found: ${cmd}. Type 'help' for a list of commands.`;
    }
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    setIsLoading(true);

    if (e.key === 'Enter') {
      const currentInput = input;
      setInput('');

      const commandEntry = (
        <div className='flex flex-row space-x-2'>
          <span className='flex-shrink text-green-400'>{'>'}</span>
          <span className='text-white'>{currentInput}</span>
        </div>
      );

      if (currentInput.toLowerCase() === 'clear') {
        setHistory([<WelcomeMessage key='welcome' />]);
        return;
      }

      let text: string | undefined = currentInput.toLowerCase();
      switch (text) {
        case 'about':
          text = 'Initializing demon-slayer.js...';
          break;
        case 'skills':
          text = 'Accessing skill loadout...';
          break;
        case 'projects':
          text = 'Loading mission logs...';
          break;
        case 'contact':
          text = 'Opening secure channel...';
          break;
        default:
          text = undefined;
      }

      setHistory(prevHistory => [
        ...prevHistory,
        commandEntry,
        <Loader text={text} key={Date.now()} />
      ]);

      const commandOutput = await processCommand(currentInput);
      const outputEntry = <Output>{commandOutput}</Output>;

      setHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1] = outputEntry;
        return newHistory;
      });
    }

    setIsLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div
      ref={terminalRef}
      className='w-full h-screen p-4 overflow-y-auto bg-black font-mono'
    >
      <History history={history} />
      <InputLine
        input={input}
        onInputChange={handleChange}
        onInputKeyDown={isLoading ? () => null : handleKeyDown}
        inputRef={inputRef}
      />
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <Terminal />
    </main>
  );
}
