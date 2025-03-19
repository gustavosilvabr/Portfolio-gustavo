
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Eye, 
  MessageSquare, 
  FolderGit2, 
  BarChart3, 
  Activity,
  Loader2
} from 'lucide-react';
import { fetchStarredRepositories, fetchUserRepositories } from '@/utils/github';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Fetch repositories for stats
  const { data: starredRepos, isLoading: isLoadingStarred } = useQuery({
    queryKey: ['starredRepos'],
    queryFn: () => fetchStarredRepositories('gustavosilvabr'),
  });
  
  const { data: userRepos, isLoading: isLoadingUserRepos } = useQuery({
    queryKey: ['userRepos'],
    queryFn: () => fetchUserRepositories('gustavosilvabr'),
  });
  
  // Mock data for dashboard
  const pageViewsData = [
    { name: 'Jan', views: 40 },
    { name: 'Feb', views: 30 },
    { name: 'Mar', views: 45 },
    { name: 'Apr', views: 47 },
    { name: 'May', views: 60 },
    { name: 'Jun', views: 85 },
    { name: 'Jul', views: 70 },
  ];
  
  const messagesData = [
    { name: 'Jan', count: 3 },
    { name: 'Feb', count: 5 },
    { name: 'Mar', count: 2 },
    { name: 'Apr', count: 7 },
    { name: 'May', count: 4 },
    { name: 'Jun', count: 9 },
    { name: 'Jul', count: 6 },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      
      <div className="md:pl-64">
        <main className="py-6 px-4 sm:px-6 md:py-8 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Page Views
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,271</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Messages
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  +6 new since last week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Projects
                </CardTitle>
                <FolderGit2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoadingUserRepos ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    userRepos?.length || 0
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {isLoadingStarred ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    `${starredRepos?.length || 0} starred repositories`
                  )}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Visitors
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,853</div>
                <p className="text-xs text-muted-foreground">
                  +14.3% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Page Views</CardTitle>
                <CardDescription>
                  Website traffic over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={pageViewsData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Contact form submissions over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={messagesData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>
                Latest actions and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-b border-border pb-4">
                  <div className="rounded-full p-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New contact message</p>
                    <p className="text-xs text-muted-foreground">John Doe - Project inquiry</p>
                    <p className="text-xs text-muted-foreground">23 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 border-b border-border pb-4">
                  <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Profile view spike</p>
                    <p className="text-xs text-muted-foreground">LinkedIn profile views +28%</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 border-b border-border pb-4">
                  <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                    <FolderGit2 size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New GitHub star</p>
                    <p className="text-xs text-muted-foreground">Your repository "react-portfolio" got a new star</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                    <BarChart3 size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Website traffic increase</p>
                    <p className="text-xs text-muted-foreground">+34% visitors from organic search</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
