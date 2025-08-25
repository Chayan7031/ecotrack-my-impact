import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Leaf, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get URL parameters
        const access_token = searchParams.get('access_token');
        const refresh_token = searchParams.get('refresh_token');
        const type = searchParams.get('type');
        const token_hash = searchParams.get('token_hash');
        const next = searchParams.get('next');

        console.log('URL params:', { access_token: !!access_token, refresh_token: !!refresh_token, type, token_hash: !!token_hash });

        // Handle different confirmation types
        if (type === 'signup' || type === 'email_change' || type === 'recovery') {
          if (access_token && refresh_token) {
            // New auth flow with tokens
            const { data, error } = await supabase.auth.setSession({
              access_token,
              refresh_token
            });

            if (error) {
              throw error;
            }

            if (data.user) {
              setStatus('success');
              setMessage('Your email has been confirmed successfully!');
              
              toast({
                title: "Email Confirmed!",
                description: "Welcome to EcoTrack! Your account is now active.",
              });

              // Redirect to dashboard after a short delay
              setTimeout(() => {
                navigate('/dashboard');
              }, 2000);
            }
          } else if (token_hash) {
            // Legacy confirmation flow
            const { data, error } = await supabase.auth.verifyOtp({
              token_hash,
              type: type as any
            });

            if (error) {
              throw error;
            }

            if (data.user) {
              setStatus('success');
              setMessage('Your email has been confirmed successfully!');
              
              toast({
                title: "Email Confirmed!",
                description: "Welcome to EcoTrack! Your account is now active.",
              });

              setTimeout(() => {
                navigate('/dashboard');
              }, 2000);
            }
          } else {
            throw new Error('Missing required confirmation parameters');
          }
        } else {
          throw new Error('Invalid confirmation type');
        }
      } catch (error: any) {
        console.error('Email confirmation error:', error);
        setStatus('error');
        setMessage(error.message || 'Failed to confirm your email. The link may be expired or invalid.');
        
        toast({
          title: "Confirmation Failed",
          description: "There was an issue confirming your email. Please try signing up again.",
          variant: "destructive",
        });
      }
    };

    // Only run if we have URL parameters
    if (searchParams.toString()) {
      handleEmailConfirmation();
    } else {
      setStatus('error');
      setMessage('No confirmation parameters found in URL.');
    }
  }, [searchParams, navigate, toast]);

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-12 h-12 text-primary animate-spin" />;
      case 'success':
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case 'error':
        return <XCircle className="w-12 h-12 text-red-500" />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'loading':
        return 'Confirming Your Email...';
      case 'success':
        return 'Email Confirmed!';
      case 'error':
        return 'Confirmation Failed';
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 eco-gradient rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">EcoTrack</h1>
              <p className="text-sm text-muted-foreground">Email Confirmation</p>
            </div>
          </div>
        </div>

        {/* Confirmation Card */}
        <Card className="card-gradient shadow-glow">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {getIcon()}
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{getTitle()}</h2>
                <p className="text-muted-foreground">{message}</p>
              </div>

              {status === 'error' && (
                <div className="space-y-4">
                  <Button 
                    onClick={() => navigate('/auth')}
                    variant="hero"
                    className="w-full"
                  >
                    Back to Sign In
                  </Button>
                  <Button 
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="w-full"
                  >
                    Go to Homepage
                  </Button>
                </div>
              )}

              {status === 'success' && (
                <div className="text-sm text-muted-foreground">
                  Redirecting to dashboard...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailConfirmation;
