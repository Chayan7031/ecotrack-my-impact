import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AuthDebug = () => {
  const { user, session, isEmailConfirmed, refreshSession } = useAuth();

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Authentication Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">User Info:</h3>
          <pre className="bg-muted p-3 rounded text-sm overflow-auto">
            {JSON.stringify({
              id: user?.id,
              email: user?.email,
              email_confirmed_at: user?.email_confirmed_at,
              created_at: user?.created_at,
              user_metadata: user?.user_metadata,
            }, null, 2)}
          </pre>
        </div>
        
        <div>
          <h3 className="font-semibold">Session Info:</h3>
          <pre className="bg-muted p-3 rounded text-sm overflow-auto">
            {JSON.stringify({
              access_token: session?.access_token ? 'Present' : 'Missing',
              refresh_token: session?.refresh_token ? 'Present' : 'Missing',
              expires_at: session?.expires_at,
            }, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold">Email Confirmation Status:</h3>
          <p className={`font-medium ${isEmailConfirmed ? 'text-green-600' : 'text-red-600'}`}>
            {isEmailConfirmed ? '✅ Email Confirmed' : '❌ Email Not Confirmed'}
          </p>
        </div>

        <Button onClick={refreshSession} variant="outline">
          Refresh Session
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthDebug;
