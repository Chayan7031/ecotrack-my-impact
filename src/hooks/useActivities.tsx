import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Activity = Tables<'activities'>;
type ActivityInsert = TablesInsert<'activities'>;
type ActivityUpdate = TablesUpdate<'activities'>;

export const useActivities = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: activities = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['activities', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .order('activity_date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const addActivity = useMutation({
    mutationFn: async (activity: Omit<ActivityInsert, 'user_id'>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('activities')
        .insert({
          ...activity,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast({
        title: "Activity Added",
        description: "Your carbon footprint activity has been logged successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Add Activity",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateActivity = useMutation({
    mutationFn: async ({ id, ...updates }: ActivityUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('activities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast({
        title: "Activity Updated",
        description: "Your activity has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Update Activity",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast({
        title: "Activity Deleted",
        description: "Your activity has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Delete Activity",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    activities,
    isLoading,
    error,
    addActivity,
    updateActivity,
    deleteActivity,
  };
};
