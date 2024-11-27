'use client';

import {Clock, Minus, Plus, RefreshCw, Target, Timer, Zap} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';

export default function InteractiveDashboard() {
  const t = useTranslations('Dashboard');
  const locale = useLocale();
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);

  // Mounting effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Real-time clock effect
  useEffect(() => {
    if (isMounted) {
      const clockInterval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(clockInterval);
    }
  }, [isMounted, locale]);

  // Timer effect
  useEffect(() => {
    if (isMounted && isTimerRunning && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isMounted, isTimerRunning, timer]);

  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
  };

  const decrementCounter = () => {
    setCounter((prev) => Math.max(0, prev - 1));
  };

  const startTimer = (duration: number) => {
    setTimer(duration);
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <Card className="w-full max-w-md animate-pulse shadow-2xl">
          <CardHeader className="rounded-t-xl bg-blue-600 text-center text-white">
            <div className="flex flex-col items-center">
              <Skeleton className="mb-2 size-10 rounded-full bg-blue-400" />
              <Skeleton className="h-8 w-32 rounded-md bg-blue-400" />
              <Skeleton className="mt-2 h-4 w-48 rounded-md bg-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <Skeleton className="h-16 w-full rounded-lg bg-blue-100" />
            <Skeleton className="h-16 w-full rounded-lg bg-green-100" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <LocaleSwitcher />
      <Card className="animate-fade-in w-full max-w-md shadow-2xl">
        <CardHeader className="rounded-t-xl bg-blue-600 text-center text-white">
          <div className="flex flex-col items-center">
            <Clock className="mb-2 size-10" />
            <CardTitle className="text-2xl font-bold">
              {formatTime(currentTime)}
            </CardTitle>
            <p className="text-sm text-blue-100">{formatDate(currentTime)}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4 shadow-inner}">
            <div className="flex items-center space-x-2">
              <Target className="text-blue-600" />
              <span className="font-semibold">{t('counter')}</span>
            </div>
            <div className="flex items-center space-x-2 }">
              <Button
                className="bg-white"
                onClick={decrementCounter}
                size="icon"
                variant="outline"
              >
                <Minus className="size-4" />
              </Button>
              <span className="text-2xl font-bold text-blue-800">
                {counter}
              </span>
              <Button
                className="bg-white"
                onClick={incrementCounter}
                size="icon"
                variant="outline"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-green-50 p-4 shadow-inner}">
            <div className="flex items-center space-x-2">
              <Timer className="text-green-600" />
              <span className="font-semibold">{t('countdown')}</span>
            </div>
            <div className="flex items-center space-x-2 }">
              <Button
                className="bg-white"
                disabled={isTimerRunning}
                onClick={() => startTimer(30)}
                size="icon"
                variant="outline"
              >
                <Zap className="size-4" />
              </Button>
              <span className="text-2xl font-bold text-green-800">
                {timer} {t('seconds')}
              </span>
              <Button
                className="bg-white"
                onClick={resetTimer}
                size="icon"
                variant="outline"
              >
                <RefreshCw className="size-4" />
              </Button>
            </div>
          </div>

          {isTimerRunning && (
            <div className="animate-pulse text-center text-sm text-orange-600">
              🚀 {t('timerRunning')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
