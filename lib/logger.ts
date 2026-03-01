/**
 * Logger Utility
 * ==============
 * Structured logging with DEBUG for development and INFO for production.
 * 
 * Usage:
 *   import { logger } from '@/lib/logger';
 *   logger.debug('Processing quiz', { quizId, userId });
 *   logger.info('Quiz completed', { score: 85 });
 *   logger.warn('Low score detected', { score: 30 });
 *   logger.error('Failed to save', { error: err.message });
 */

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  source?: string;
}

class Logger {
  private level: LogLevel;
  private static instance: Logger;

  private readonly LEVEL_PRIORITY: Record<LogLevel, number> = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
  };

  private readonly LEVEL_COLORS: Record<LogLevel, string> = {
    DEBUG: '\x1b[36m',  // Cyan
    INFO: '\x1b[32m',   // Green
    WARN: '\x1b[33m',   // Yellow
    ERROR: '\x1b[31m',  // Red
  };

  private readonly RESET = '\x1b[0m';

  constructor() {
    // In production (NODE_ENV=production), only show INFO and above
    // In development, show everything including DEBUG
    this.level = process.env.NODE_ENV === 'production' ? 'INFO' : 'DEBUG';
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private shouldLog(level: LogLevel): boolean {
    return this.LEVEL_PRIORITY[level] >= this.LEVEL_PRIORITY[this.level];
  }

  private formatEntry(entry: LogEntry): string {
    const color = this.LEVEL_COLORS[entry.level];
    const contextStr = entry.context ? ` | ${JSON.stringify(entry.context)}` : '';
    const sourceStr = entry.source ? ` [${entry.source}]` : '';
    
    if (typeof window !== 'undefined') {
      // Browser environment - no ANSI colors
      return `[${entry.timestamp}] ${entry.level}${sourceStr}: ${entry.message}${contextStr}`;
    }
    
    // Server environment - with colors
    return `${color}[${entry.timestamp}] ${entry.level}${this.RESET}${sourceStr}: ${entry.message}${contextStr}`;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, source?: string) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      source,
    };

    const formatted = this.formatEntry(entry);

    switch (level) {
      case 'DEBUG':
        console.debug(formatted);
        break;
      case 'INFO':
        console.info(formatted);
        break;
      case 'WARN':
        console.warn(formatted);
        break;
      case 'ERROR':
        console.error(formatted);
        break;
    }
  }

  debug(message: string, context?: Record<string, any>) {
    this.log('DEBUG', message, context);
  }

  info(message: string, context?: Record<string, any>) {
    this.log('INFO', message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('WARN', message, context);
  }

  error(message: string, context?: Record<string, any>) {
    this.log('ERROR', message, context);
  }

  /**
   * Create a child logger with a source label
   * Usage: const log = logger.child('QuizEngine');
   *        log.info('Quiz started'); // [INFO] [QuizEngine]: Quiz started
   */
  child(source: string) {
    const parent = this;
    return {
      debug: (msg: string, ctx?: Record<string, any>) => parent.log('DEBUG', msg, ctx, source),
      info: (msg: string, ctx?: Record<string, any>) => parent.log('INFO', msg, ctx, source),
      warn: (msg: string, ctx?: Record<string, any>) => parent.log('WARN', msg, ctx, source),
      error: (msg: string, ctx?: Record<string, any>) => parent.log('ERROR', msg, ctx, source),
    };
  }
}

export const logger = Logger.getInstance();
