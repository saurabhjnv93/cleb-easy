import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type PackageItem = {
  _id: string;
  name: string;
  description: string;
  startingPrice: number;
  features: string[];
  theme: string;
  cityAvailability: string[];
};

type BookingItem = {
  _id: string;
  user: string;
  eventType: string;
  date: string;
  time: string;
  guests: number;
  packageId: string;
  addons: string[];
  requirements: string;
  city: string;
  status: string;
  price: number;
  createdAt: string;
};

type MockDb = {
  users: Array<UserProfile & { password: string }>;
  packages: PackageItem[];
  bookings: BookingItem[];
};

type ApiResponse = Promise<{ data: any }>;

const rawApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
});

rawApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('celebeasy_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const MOCK_DB_KEY = 'celebeasy_mock_db';

const defaultPackages: PackageItem[] = [
  {
    _id: 'pkg-basic',
    name: 'Birthday Bliss',
    description: 'Balloon styling, cake corner, welcome signage, and tidy in-home setup.',
    startingPrice: 2999,
    features: ['Balloons', 'Cake table', 'Welcome board'],
    theme: 'Classic',
    cityAvailability: ['Mumbai', 'Delhi', 'Bengaluru'],
  },
  {
    _id: 'pkg-premium',
    name: 'Baby Shower Bloom',
    description: 'Soft backdrops, themed decor, dessert styling, and premium finishing touches.',
    startingPrice: 4499,
    features: ['Backdrop', 'Themed decor', 'Dessert styling'],
    theme: 'Pastel',
    cityAvailability: ['Mumbai', 'Delhi', 'Hyderabad', 'Pune'],
  },
  {
    _id: 'pkg-luxe',
    name: 'Anniversary Glow',
    description: 'Romantic dining setup, floral accents, candles, and elevated styling.',
    startingPrice: 6999,
    features: ['Tablescape', 'Candles', 'Floral styling'],
    theme: 'Romantic',
    cityAvailability: ['Mumbai', 'Delhi', 'Bengaluru'],
  },
];

const defaultDb = (): MockDb => ({
  users: [
    {
      id: 'user-demo',
      name: 'Demo User',
      email: 'demo@celebeasy.com',
      password: 'demo123',
      role: 'user',
    },
    {
      id: 'admin-demo',
      name: 'Admin',
      email: 'admin@celebeasy.com',
      password: 'Admin123!',
      role: 'admin',
    },
  ],
  packages: defaultPackages,
  bookings: [],
});

const readDb = (): MockDb => {
  const raw = localStorage.getItem(MOCK_DB_KEY);
  if (!raw) {
    const db = defaultDb();
    localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
    return db;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<MockDb>;
    const db: MockDb = {
      users: parsed.users ?? defaultDb().users,
      packages: parsed.packages?.length ? parsed.packages : defaultPackages,
      bookings: parsed.bookings ?? [],
    };
    localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
    return db;
  } catch {
    const db = defaultDb();
    localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
    return db;
  }
};

const writeDb = (db: MockDb) => {
  localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
};

const makeToken = (userId: string) => `mock-token:${userId}`;

const readTokenUser = () => {
  const token = localStorage.getItem('celebeasy_token');
  if (!token?.startsWith('mock-token:')) return null;
  const userId = token.replace('mock-token:', '');
  return readDb().users.find((user) => user.id === userId) ?? null;
};

const toProfile = (user: UserProfile | (UserProfile & { password: string })) => ({
  id: user.id,
  _id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const shouldFallback = (error: unknown) => {
  const axiosError = error as AxiosError;
  return !axiosError.response || axiosError.response.status >= 500 || axiosError.response.status === 404;
};

const ensureAuthShape = (path: string, data: unknown) => {
  if (!path.startsWith('/auth/')) return true;
  if (!data || typeof data !== 'object') return false;
  const payload = data as Record<string, unknown>;
  if (path === '/auth/profile') return Boolean(payload.user);
  return Boolean(payload.user && payload.token);
};

const mockGet = async (path: string) => {
  const db = readDb();

  if (path === '/auth/profile') {
    const user = readTokenUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    return { data: { user: toProfile(user) } };
  }

  if (path === '/packages') {
    return { data: { packages: db.packages } };
  }

  if (path === '/bookings') {
    const user = readTokenUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    return {
      data: {
        bookings: db.bookings
          .filter((booking) => booking.user === user.id)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      },
    };
  }

  if (path === '/admin/overview') {
    const user = readTokenUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Forbidden');
    }

    const revenue = db.bookings.reduce((sum, booking) => sum + booking.price, 0);
    const recentBookings = db.bookings
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8)
      .map((booking) => ({
        ...booking,
        user: {
          name: db.users.find((item) => item.id === booking.user)?.name,
        },
      }));

    return {
      data: {
        totalUsers: db.users.length,
        totalBookings: db.bookings.length,
        revenue,
        recentBookings,
      },
    };
  }

  throw new Error(`No mock handler for GET ${path}`);
};

const mockPost = async (path: string, body?: Record<string, unknown>) => {
  const db = readDb();

  if (path === '/auth/signup') {
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const password = String(body?.password ?? '');

    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    if (db.users.some((user) => user.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: 'user',
    };
    db.users.push(newUser);
    writeDb(db);

    return { data: { token: makeToken(newUser.id), user: toProfile(newUser) } };
  }

  if (path === '/auth/login') {
    const email = String(body?.email ?? '').trim().toLowerCase();
    const password = String(body?.password ?? '');
    const user = db.users.find((item) => item.email === email && item.password === password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return { data: { token: makeToken(user.id), user: toProfile(user) } };
  }

  if (path === '/bookings') {
    const user = readTokenUser();
    if (!user) {
      throw new Error('Please login first');
    }

    const newBooking: BookingItem = {
      _id: `booking-${Date.now()}`,
      user: user.id,
      eventType: String(body?.eventType ?? 'Event'),
      date: String(body?.date ?? new Date().toISOString().slice(0, 10)),
      time: String(body?.time ?? '19:00'),
      guests: Number(body?.guests ?? 1),
      packageId: String(body?.packageId ?? ''),
      addons: Array.isArray(body?.addons) ? body.addons.map(String) : [],
      requirements: String(body?.requirements ?? ''),
      city: String(body?.city ?? 'Mumbai'),
      status: 'pending',
      price: Number(body?.price ?? 0),
      createdAt: new Date().toISOString(),
    };

    db.bookings.push(newBooking);
    writeDb(db);

    return { data: { booking: newBooking } };
  }

  throw new Error(`No mock handler for POST ${path}`);
};

const mockPut = async () => {
  throw new Error('Mock PUT not implemented');
};

const mockDelete = async () => {
  throw new Error('Mock DELETE not implemented');
};

const wrapMockError = (error: unknown) => {
  const message = error instanceof Error ? error.message : 'Request failed';
  return Promise.reject({ response: { data: { error: message } } });
};

const request = async (
  method: 'get' | 'post' | 'put' | 'delete',
  path: string,
  body?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): ApiResponse => {
  try {
    const response =
      method === 'get'
        ? await rawApi.get(path, config)
        : method === 'post'
          ? await rawApi.post(path, body, config)
          : method === 'put'
            ? await rawApi.put(path, body, config)
            : await rawApi.delete(path, config);

    if (!ensureAuthShape(path, response.data)) {
      if (method === 'post') {
        return await mockPost(path, body);
      }
      if (method === 'get') {
        return await mockGet(path);
      }
    }

    return { data: response.data };
  } catch (error) {
    if (!shouldFallback(error)) {
      throw error;
    }

    try {
      if (method === 'get') return await mockGet(path);
      if (method === 'post') return await mockPost(path, body);
      if (method === 'put') return await mockPut();
      return await mockDelete();
    } catch (mockError) {
      return wrapMockError(mockError);
    }
  }
};

const api = {
  get: (path: string, config?: AxiosRequestConfig) => request('get', path, undefined, config),
  post: (path: string, body?: Record<string, unknown>, config?: AxiosRequestConfig) => request('post', path, body, config),
  put: (path: string, body?: Record<string, unknown>, config?: AxiosRequestConfig) => request('put', path, body, config),
  delete: (path: string, config?: AxiosRequestConfig) => request('delete', path, undefined, config),
};

export default api;
