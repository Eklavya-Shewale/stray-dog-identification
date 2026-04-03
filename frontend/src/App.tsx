import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  Camera,
  CheckCircle2,
  Database,
  Dog,
  Heart,
  Info,
  MapPin,
  PawPrint,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';

type Page = 'landing' | 'tool';

type DogProfile = {
  name: string;
  image_url: string;
  health_status?: string | null;
  rabies_status?: string | null;
  last_seen?: string | null;
  age?: string | null;
  breed?: string | null;
  location?: string | null;
  notes?: string | null;
};

type IdentifyResponse =
  | { status: 'matched'; confidence: number; dog: DogProfile }
  | { status: 'unknown'; confidence: number; message: string };

type RegisterResponse = {
  status: string;
  message: string;
  dog: DogProfile;
};

type RegisterImageResponse = {
  status: string;
  message: string;
  total_images: number;
  dog: DogProfile;
};

type ResultState =
  | { kind: 'matched'; confidence: number; dog: DogProfile }
  | { kind: 'unknown'; confidence: number; message: string; preview: string | null }
  | { kind: 'saved'; mode: 'register' | 'register-image'; message: string; dog: DogProfile; totalImages?: number };

type ProfileForm = {
  health_status: string;
  rabies_status: string;
  last_seen: string;
  age: string;
  breed: string;
  location: string;
  notes: string;
};

const API_BASE = 'http://localhost:8000';

const emptyProfileForm: ProfileForm = {
  health_status: '',
  rabies_status: '',
  last_seen: '',
  age: '',
  breed: '',
  location: '',
  notes: '',
};

const metaFields: Array<{ key: keyof Omit<ProfileForm, 'notes'>; label: string; icon: 'map' | 'heart' | 'shield' | 'dog' | 'database' }> = [
  { key: 'last_seen', label: 'Last seen', icon: 'map' },
  { key: 'health_status', label: 'Health status', icon: 'heart' },
  { key: 'rabies_status', label: 'Rabies status', icon: 'shield' },
  { key: 'age', label: 'Age', icon: 'dog' },
  { key: 'breed', label: 'Breed', icon: 'dog' },
  { key: 'location', label: 'Location', icon: 'database' },
];

const displayValue = (value?: string | null, fallback = 'Not provided') => {
  if (!value) return fallback;
  return value.trim() || fallback;
};

const confidenceLabel = (confidence: number) => `${(confidence * 100).toFixed(1)}%`;

const iconForField = (name: string) => {
  if (name === 'last_seen') return <MapPin size={18} className="text-brand-orange" />;
  if (name === 'health_status') return <Heart size={18} className="text-brand-green-dark" />;
  if (name === 'rabies_status') return <ShieldCheck size={18} className="text-brand-orange" />;
  if (name === 'location') return <Database size={18} className="text-brand-brown-dark" />;
  return <Dog size={18} className="text-brand-brown" />;
};

const Navbar = ({ currentPage, setPage }: { currentPage: Page; setPage: (page: Page) => void }) => (
  <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
    <nav className="glass-pill px-3 py-2 rounded-full flex items-center gap-2 pointer-events-auto border border-white/40 shadow-lg">
      <button onClick={() => setPage('landing')} className="flex items-center gap-3 px-4 py-2 rounded-full text-brand-brown-dark font-bold hover:text-brand-orange transition-colors">
        <span className="bg-brand-orange text-white p-2 rounded-full"><Dog size={16} /></span>
        <span className="hidden sm:block">PawTrace AI</span>
      </button>
      <button onClick={() => setPage('landing')} className={`px-5 py-2 rounded-full font-bold ${currentPage === 'landing' ? 'bg-brand-orange text-white' : 'text-brand-brown-dark hover:text-brand-orange'}`}>
        Home
      </button>
      <button onClick={() => setPage('tool')} className={`px-5 py-2 rounded-full font-bold ${currentPage === 'tool' ? 'bg-brand-orange text-white' : 'text-brand-brown-dark hover:text-brand-orange'}`}>
        Try AI Identifier
      </button>
    </nav>
  </div>
);

const Footer = ({ setPage }: { setPage: (page: Page) => void }) => (
  <footer className="bg-brand-brown-dark text-brand-cream py-12 mt-20">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <p className="font-bold text-xl mb-2">PawTrace AI</p>
        <p className="text-brand-brown-light">Cloudinary-backed stray dog identification for safer communities.</p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => setPage('landing')} className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors font-bold">Home</button>
        <button onClick={() => setPage('tool')} className="px-5 py-3 rounded-2xl bg-brand-orange hover:bg-brand-orange/90 transition-colors font-bold text-white">Open Tool</button>
      </div>
    </div>
  </footer>
);
const LandingPage = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen pt-28 pb-16 px-6 bg-brand-cream relative overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-[-10%] right-[-5%] w-[520px] h-[520px] bg-brand-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[520px] h-[520px] bg-brand-green/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 paw-bg opacity-40" />
    </div>

    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
      <div>
        <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-5 py-2 rounded-full font-bold text-sm mb-8 border border-brand-orange/20">
          <Sparkles size={16} />
          FastAPI + Cloudinary + MobileNet gallery matching
        </div>
        <h1 className="text-6xl md:text-7xl font-bold text-brand-brown-dark leading-tight mb-6">
          Recognizing Every <span className="text-brand-orange">Stray</span>, Protecting Every Life.
        </h1>
        <p className="text-xl text-brand-brown leading-relaxed mb-10 max-w-xl font-medium">
          Register dogs with health-card metadata, upload more gallery views over time, and identify returning strays against the stored Cloudinary gallery.
        </p>
        <div className="flex flex-wrap gap-4">
          <button onClick={onStart} className="bg-brand-brown-dark text-white px-8 py-5 rounded-[2rem] font-bold text-lg hover:bg-brand-brown transition-all shadow-xl flex items-center gap-3 group">
            Open AI Tool
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="bg-white/60 backdrop-blur rounded-[2rem] px-6 py-5 border border-white/40 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-1">Live stack</p>
            <p className="text-brand-brown-dark font-bold">Image upload -&gt; Cloudinary -&gt; ML embedding -&gt; gallery match</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} className="glass-card rounded-[3rem] p-8 border border-white/40 shadow-2xl">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: 'Health status', value: 'Healthy / recovering / under care', icon: <Heart className="text-brand-green-dark" size={20} /> },
            { label: 'Rabies status', value: 'Vaccinated / due / unknown', icon: <ShieldCheck className="text-brand-orange" size={20} /> },
            { label: 'Last seen', value: 'Area, landmark, neighborhood', icon: <MapPin className="text-brand-orange" size={20} /> },
            { label: 'Gallery growth', value: 'More angles improve confidence', icon: <Database className="text-brand-brown-dark" size={20} /> },
          ].map((item) => (
            <div key={item.label} className="bg-white/70 rounded-[2rem] p-5 border border-white/40">
              <div className="flex items-center gap-2 mb-3">{item.icon}<p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold">{item.label}</p></div>
              <p className="font-bold text-brand-brown-dark leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[2.5rem] bg-brand-brown-dark text-white p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-brand-orange/20 blur-3xl" />
          <p className="text-sm uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-3">Workflow</p>
          <div className="space-y-4 text-lg font-bold">
            <div className="flex items-center gap-3"><span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">1</span>Register a new dog profile</div>
            <div className="flex items-center gap-3"><span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">2</span>Add more gallery photos of the same dog</div>
            <div className="flex items-center gap-3"><span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">3</span>Identify future uploads against the stored gallery</div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

const AIServicePage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [activeAction, setActiveAction] = useState<'identify' | 'register' | 'register-image' | null>(null);
  const [result, setResult] = useState<ResultState | null>(null);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [dogName, setDogName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [profileForm, setProfileForm] = useState<ProfileForm>(emptyProfileForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const confidencePercent = useMemo(() => {
    if (!result || result.kind === 'saved') return 0;
    return Math.max(0, Math.min(100, result.confidence * 100));
  }, [result]);

  const setPreviewFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setSelectedImage(reader.result as string);
    reader.readAsDataURL(file);
    setSelectedFile(file);
    setBanner(null);
  };

  const clearResult = () => {
    setResult(null);
    setBanner(null);
  };

  const clearAll = () => {
    setSelectedFile(null);
    setSelectedImage(null);
    setDogName('');
    setProfileForm(emptyProfileForm);
    clearResult();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const updateField = (field: keyof ProfileForm, value: string) => {
    setProfileForm((current) => ({ ...current, [field]: value }));
  };

  const buildFormData = () => {
    const formData = new FormData();
    if (selectedFile) formData.append('file', selectedFile);
    return formData;
  };

  const runAction = async (action: 'identify' | 'register' | 'register-image') => {
    if (!selectedFile) return;
    if (action !== 'identify' && !dogName.trim()) {
      setBanner({ type: 'error', text: 'Dog name is required for registration and gallery uploads.' });
      return;
    }

    setIsUploading(true);
    setActiveAction(action);
    clearResult();

    try {
      const formData = buildFormData();
      let endpoint = '/identify';

      if (action === 'register') {
        endpoint = '/register';
        formData.append('name', dogName.trim());
        (Object.entries(profileForm) as Array<[keyof ProfileForm, string]>).forEach(([key, value]) => {
          formData.append(key, value.trim());
        });
      }

      if (action === 'register-image') {
        endpoint = '/register-image';
        formData.append('name', dogName.trim());
      }

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('The backend request failed. Check the FastAPI server and try again.');
      }

      if (action === 'identify') {
        const identifyData = data as IdentifyResponse;
        if (identifyData.status === 'matched') {
          setResult({ kind: 'matched', confidence: identifyData.confidence, dog: identifyData.dog });
          setBanner({ type: 'success', text: `Match found for ${identifyData.dog.name} with ${confidenceLabel(identifyData.confidence)} confidence.` });
        } else {
          setResult({ kind: 'unknown', confidence: identifyData.confidence, message: identifyData.message, preview: selectedImage });
          setBanner({ type: 'error', text: `${identifyData.message} Closest similarity: ${confidenceLabel(identifyData.confidence)}.` });
        }
      }

      if (action === 'register') {
        const registerData = data as RegisterResponse;
        if (registerData.status !== 'success') throw new Error(registerData.message || 'Registration did not complete.');
        setResult({ kind: 'saved', mode: 'register', message: registerData.message, dog: registerData.dog });
        setBanner({ type: 'success', text: `${registerData.dog.name} was registered and stored successfully.` });
      }

      if (action === 'register-image') {
        const registerImageData = data as RegisterImageResponse;
        if (registerImageData.status !== 'success') throw new Error(registerImageData.message || 'Gallery upload did not complete.');
        setResult({ kind: 'saved', mode: 'register-image', message: registerImageData.message, dog: registerImageData.dog, totalImages: registerImageData.total_images });
        setBanner({ type: 'success', text: `Added a new gallery photo for ${registerImageData.dog.name}. Total images: ${registerImageData.total_images}.` });
      }
    } catch (error) {
      setBanner({ type: 'error', text: error instanceof Error ? error.message : 'Something went wrong while talking to the backend.' });
    } finally {
      setIsUploading(false);
      setActiveAction(null);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-cream relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#FF8C42_0.5px,transparent_0.5px)] [background-size:32px_32px]" />
      </div>
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-bold text-brand-brown-dark mb-5 tracking-tight">AI Dog <span className="text-brand-orange">Identifier</span></h1>
          <p className="text-xl text-brand-brown max-w-3xl mx-auto font-medium">Use one frontend for all three actions: identify an uploaded dog, register a new profile, or add more images to an existing gallery profile.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="xl:col-span-5 glass-card rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -mr-16 -mt-16" />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);
                const file = event.dataTransfer.files?.[0];
                if (file && file.type.startsWith('image/')) setPreviewFromFile(file);
              }}
              className={`border-4 border-dashed rounded-[2.5rem] p-10 text-center cursor-pointer transition-all duration-300 ${selectedImage ? 'border-brand-green bg-brand-green/5' : isDragging ? 'border-brand-orange bg-brand-orange/10' : 'border-brand-brown-light/40 hover:border-brand-orange hover:bg-brand-orange/5'}`}
            >
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) setPreviewFromFile(file);
              }} />
              {selectedImage ? (
                <div className="space-y-4">
                  <img src={selectedImage} alt="Selected dog" className="w-full h-72 object-cover rounded-[2rem] border-4 border-white shadow-xl" />
                  <div className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-full font-bold text-brand-brown-dark shadow-sm">
                    <Camera size={18} />
                    Change Photo
                  </div>
                </div>
              ) : (
                <div className="py-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-[2rem] bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6"><Upload size={46} /></div>
                  <p className="text-2xl font-bold text-brand-brown-dark mb-2">Drop your photo here</p>
                  <p className="text-brand-brown font-medium">Or click to browse files for identify or registration.</p>
                </div>
              )}
            </div>

            {banner && (
              <div className={`mt-5 rounded-[2rem] px-5 py-4 text-sm font-bold border ${banner.type === 'success' ? 'bg-brand-green/15 text-brand-green-dark border-brand-green/30' : 'bg-red-50 text-red-700 border-red-200'}`}>
                {banner.text}
              </div>
            )}

            <div className="mt-8 space-y-5">
              <div className="relative">
                <Dog className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-brown-light" size={20} />
                <input value={dogName} onChange={(event) => setDogName(event.target.value)} placeholder="Dog name (required for register and add gallery photo)" className="w-full bg-white/60 border-2 border-brand-brown-light/30 rounded-2xl pl-14 pr-5 py-4 font-bold text-brand-brown-dark focus:outline-none focus:border-brand-orange/50" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {metaFields.map((field) => (
                  <div key={field.key} className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">{iconForField(field.key)}</div>
                    <input
                      value={profileForm[field.key]}
                      onChange={(event) => updateField(field.key, event.target.value)}
                      placeholder={field.label}
                      className="w-full bg-white/60 border-2 border-brand-brown-light/30 rounded-2xl pl-11 pr-4 py-4 font-semibold text-brand-brown-dark focus:outline-none focus:border-brand-orange/50"
                    />
                  </div>
                ))}
              </div>

              <textarea value={profileForm.notes} onChange={(event) => updateField('notes', event.target.value)} rows={4} placeholder="Notes, temperament, collar details, rescue history" className="w-full bg-white/60 border-2 border-brand-brown-light/30 rounded-[2rem] px-5 py-4 font-semibold text-brand-brown-dark focus:outline-none focus:border-brand-orange/50 resize-none" />

              <div className="grid sm:grid-cols-3 gap-4">
                <button onClick={() => runAction('identify')} disabled={!selectedFile || isUploading} className="bg-brand-brown-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-brown transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {isUploading && activeAction === 'identify' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Search size={18} />Identify Dog</>}
                </button>
                <button onClick={() => runAction('register')} disabled={!selectedFile || !dogName.trim() || isUploading} className="bg-brand-orange text-white py-4 rounded-2xl font-bold hover:bg-brand-orange/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {isUploading && activeAction === 'register' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><CheckCircle2 size={18} />Register New</>}
                </button>
                <button onClick={() => runAction('register-image')} disabled={!selectedFile || !dogName.trim() || isUploading} className="bg-brand-green-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-green-dark/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {isUploading && activeAction === 'register-image' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Database size={18} />Add Gallery Photo</>}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="xl:col-span-7">
            <AnimatePresence mode="wait">
              {result?.kind === 'matched' && (
                <motion.div key="matched" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="glass-card rounded-[3rem] p-8 shadow-2xl border border-brand-green/30">
                  <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    <img src={result.dog.image_url} alt={result.dog.name} className="w-full lg:w-56 h-56 object-cover rounded-[2rem] border-4 border-white shadow-xl" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                        <div>
                          <p className="text-sm uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Identified profile</p>
                          <h3 className="text-5xl font-black text-brand-brown-dark mb-2">{result.dog.name}</h3>
                          <p className="text-xl font-bold text-brand-orange">{displayValue(result.dog.breed, 'Breed not recorded')}</p>
                        </div>
                        <div className="bg-brand-green text-white px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest">{confidenceLabel(result.confidence)} match</div>
                      </div>
                      <div className="mb-4 flex justify-between text-sm font-bold text-brand-brown"><span>Confidence level</span><span>{confidenceLabel(result.confidence)}</span></div>
                      <div className="w-full h-3 rounded-full bg-brand-brown-light/20 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${confidencePercent}%` }} className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light" /></div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-8">
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Last seen</p><p className="text-xl font-bold text-brand-brown-dark">{displayValue(result.dog.last_seen)}</p></div>
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Health status</p><p className="text-xl font-bold text-brand-green-dark">{displayValue(result.dog.health_status)}</p></div>
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Rabies status</p><p className="text-xl font-bold text-brand-brown-dark">{displayValue(result.dog.rabies_status)}</p></div>
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Age</p><p className="text-xl font-bold text-brand-brown-dark">{displayValue(result.dog.age)}</p></div>
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Location</p><p className="text-xl font-bold text-brand-brown-dark">{displayValue(result.dog.location)}</p></div>
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Stored image</p><a href={result.dog.image_url} target="_blank" rel="noreferrer" className="text-brand-orange font-bold hover:underline break-all">Open Cloudinary image</a></div>
                    <div className="md:col-span-2 bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Notes</p><p className="text-brand-brown font-medium leading-relaxed">{displayValue(result.dog.notes, 'No notes stored for this dog yet.')}</p></div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button onClick={clearResult} className="flex-1 min-w-[200px] py-4 rounded-2xl border-2 border-brand-brown-light/30 font-bold text-brand-brown hover:bg-white/50 transition-all flex items-center justify-center gap-2"><X size={18} />Clear Result</button>
                    <button onClick={() => window.open(result.dog.image_url, '_blank', 'noopener,noreferrer')} className="bg-brand-brown-dark text-white px-8 rounded-2xl font-bold hover:bg-brand-brown transition-all shadow-lg">Open Report Image</button>
                  </div>
                </motion.div>
              )}
              {result?.kind === 'unknown' && (
                <motion.div key="unknown" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="glass-card rounded-[3rem] p-8 shadow-2xl border border-brand-orange/20">
                  <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
                    {result.preview && <img src={result.preview} alt="Uploaded dog" className="w-full lg:w-56 h-56 object-cover rounded-[2rem] border-4 border-white shadow-xl" />}
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-full font-bold uppercase tracking-widest text-sm mb-4">No Match Found</div>
                      <h3 className="text-4xl font-black text-brand-brown-dark mb-3">Unknown dog for now</h3>
                      <p className="text-brand-brown font-medium leading-relaxed mb-6">{result.message}. This upload stays below the 0.7 similarity threshold against the current gallery.</p>
                      <div className="mb-4 flex justify-between text-sm font-bold text-brand-brown"><span>Closest similarity</span><span>{confidenceLabel(result.confidence)}</span></div>
                      <div className="w-full h-3 rounded-full bg-brand-brown-light/20 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${confidencePercent}%` }} className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light" /></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={clearResult} className="flex-1 min-w-[200px] py-4 rounded-2xl border-2 border-brand-brown-light/30 font-bold text-brand-brown hover:bg-white/50 transition-all flex items-center justify-center gap-2"><X size={18} />Clear Result</button>
                    <button onClick={() => setBanner({ type: 'success', text: 'If this is a brand new dog, use Register New. If it belongs to an existing profile, use Add Gallery Photo with the exact same name.' })} className="bg-brand-orange text-white px-8 rounded-2xl font-bold hover:bg-brand-orange/90 transition-all shadow-lg">Suggested Next Step</button>
                  </div>
                </motion.div>
              )}

              {result?.kind === 'saved' && (
                <motion.div key="saved" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="glass-card rounded-[3rem] p-8 shadow-2xl border border-brand-green/20">
                  <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
                    <img src={result.dog.image_url} alt={result.dog.name} className="w-full lg:w-56 h-56 object-cover rounded-[2rem] border-4 border-white shadow-xl" />
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 bg-brand-green/15 text-brand-green-dark px-4 py-2 rounded-full font-bold uppercase tracking-widest text-sm mb-4">
                        <CheckCircle2 size={16} />
                        {result.mode === 'register' ? 'Profile Registered' : 'Gallery Photo Added'}
                      </div>
                      <h3 className="text-4xl font-black text-brand-brown-dark mb-3">{result.dog.name}</h3>
                      <p className="text-brand-brown font-medium leading-relaxed mb-5">{result.message}. The backend has already stored the image in Cloudinary and generated the embedding for future identification.</p>
                      {result.totalImages && <div className="inline-flex items-center gap-2 bg-white/70 rounded-full px-4 py-2 font-bold text-brand-brown-dark border border-white/50"><Database size={18} />Gallery size: {result.totalImages} images</div>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-8">
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Breed</p><p className="text-xl font-bold text-brand-brown-dark">{displayValue(result.dog.breed)}</p></div>
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Health status</p><p className="text-xl font-bold text-brand-brown-dark">{displayValue(result.dog.health_status)}</p></div>
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Rabies status</p><p className="text-xl font-bold text-brand-brown-dark">{displayValue(result.dog.rabies_status)}</p></div>
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Age</p><p className="text-xl font-bold text-brand-brown-dark">{displayValue(result.dog.age)}</p></div>
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Last seen</p><p className="text-xl font-bold text-brand-brown-dark">{displayValue(result.dog.last_seen)}</p></div>
                    <div className="bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Location</p><p className="text-xl font-bold text-brand-brown-dark">{displayValue(result.dog.location)}</p></div>
                    <div className="md:col-span-2 bg-white/60 rounded-[2rem] p-5 border border-white/50"><p className="text-xs uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Notes</p><p className="text-brand-brown font-medium leading-relaxed">{displayValue(result.dog.notes, 'No notes stored yet.')}</p></div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button onClick={clearResult} className="flex-1 min-w-[200px] py-4 rounded-2xl border-2 border-brand-brown-light/30 font-bold text-brand-brown hover:bg-white/50 transition-all flex items-center justify-center gap-2"><X size={18} />Clear Result</button>
                    <button onClick={clearAll} className="bg-brand-brown-dark text-white px-8 rounded-2xl font-bold hover:bg-brand-brown transition-all shadow-lg">Start Fresh</button>
                  </div>
                </motion.div>
              )}

              {!result && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-[3rem] p-12 text-center border-4 border-dashed border-brand-brown-light/20 min-h-[760px] flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 paw-bg opacity-5" />
                  {isUploading ? (
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="relative w-28 h-28 mb-8">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 border-4 border-brand-orange/10 border-t-brand-orange rounded-full" />
                        <div className="absolute inset-0 flex items-center justify-center"><Dog className="text-brand-orange" size={44} /></div>
                      </div>
                      <h3 className="text-3xl font-bold text-brand-brown-dark mb-4">{activeAction === 'identify' ? 'Matching against gallery...' : 'Uploading and saving...'}</h3>
                      <p className="text-lg text-brand-brown font-medium max-w-lg">{activeAction === 'identify' ? 'The uploaded image is being converted into an embedding and compared with all registered gallery vectors.' : 'The image is being uploaded to Cloudinary first, then the backend is generating its feature vector and saving the result.'}</p>
                    </div>
                  ) : (
                    <div className="relative z-10 max-w-3xl">
                      <div className="w-24 h-24 bg-brand-brown-light/10 rounded-[2rem] flex items-center justify-center text-brand-brown-light mb-8 mx-auto"><Info size={46} /></div>
                      <h3 className="text-3xl font-bold text-brand-brown-dark mb-4">Ready for the live backend</h3>
                      <p className="text-lg text-brand-brown font-medium leading-relaxed mb-10">The frontend is now wired to FastAPI routes. Register a dog with health-card metadata, grow its gallery with extra photos, and identify future sightings directly from this interface.</p>
                      <div className="grid md:grid-cols-3 gap-4 text-left">
                        <div className="bg-white/50 rounded-[2rem] p-5 border border-white/50"><p className="text-sm uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Register New</p><p className="text-brand-brown font-medium">Creates a dog profile with name, health status, rabies status, age, breed, location, and notes.</p></div>
                        <div className="bg-white/50 rounded-[2rem] p-5 border border-white/50"><p className="text-sm uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Add Gallery Photo</p><p className="text-brand-brown font-medium">Adds more photos to the same dog profile so matching gets stronger with different views.</p></div>
                        <div className="bg-white/50 rounded-[2rem] p-5 border border-white/50"><p className="text-sm uppercase tracking-[0.2em] text-brand-brown-light font-bold mb-2">Identify Dog</p><p className="text-brand-brown font-medium">Shows matched profile details from the backend or returns the unknown-dog message with confidence.</p></div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: 'Cloudinary First', desc: 'Every saved dog image is uploaded remotely first so the backend can extract the embedding from the final URL.' },
            { icon: Activity, title: 'Live Matching', desc: 'Identify Dog compares the current upload against every stored gallery embedding in the backend database.' },
            { icon: PawPrint, title: 'Better With More Photos', desc: 'Use Add Gallery Photo to improve same-dog matches across different angles, lighting, and poses.' },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-[2rem] p-6 border border-white/50 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-brand-orange shadow-sm mb-4"><item.icon size={22} /></div>
              <h4 className="text-xl font-bold text-brand-brown-dark mb-2">{item.title}</h4>
              <p className="text-brand-brown font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState<Page>('landing');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={page} setPage={setPage} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'landing' ? (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LandingPage onStart={() => setPage('tool')} />
            </motion.div>
          ) : (
            <motion.div key="tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AIServicePage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}
