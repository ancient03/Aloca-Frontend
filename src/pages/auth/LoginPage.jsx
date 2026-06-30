import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.jpeg";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const errs = {};

    if (!form.email) errs.email = "Email wajib diisi";
    if (!form.password) errs.password = "Password wajib diisi";

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await login(form.email, form.password);
      if (success) {
        navigate("/beranda");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-[#00C2A8] to-[#009F8A] relative overflow-hidden">
        <div className="absolute top-0 left-0 -translate-x-24 -translate-y-24 rounded-full w-72 h-72 bg-white/10" />
        <div className="absolute bottom-0 right-0 translate-x-32 translate-y-32 rounded-full w-96 h-96 bg-white/5" />
        <div className="absolute w-40 h-40 rounded-full top-1/2 right-8 bg-white/10" />

        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-white/20 rounded-3xl backdrop-blur-sm">
            <span className="text-4xl">
              <img src={logo} alt="Logo" className="w-6 h-6" />
            </span>
          </div>

          <h1 className="mb-3 text-4xl font-bold text-white">Aloca.id</h1>

          <p className="max-w-xs text-lg text-white/80">
            Kelola keuanganmu dengan sistem kantong yang simpel dan intuitif.
          </p>

          <div className="grid grid-cols-1 gap-4 mt-10 text-left">
            {[
              {
                emoji: "🎯",
                title: "Target Tabungan",
                desc: "Set goal per kantong",
              },
              {
                emoji: "📊",
                title: "Pantau Keuangan",
                desc: "Dashboard real-time",
              },
              {
                emoji: "↔️",
                title: "Transfer Mudah",
                desc: "Pindah saldo antar kantong",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm"
              >
                <span className="text-2xl">{f.emoji}</span>

                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>

                  <p className="text-xs text-white/70">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col items-center justify-center flex-1 p-8 bg-white lg:max-w-md">
        <div className="mb-8 text-center lg:hidden">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00C2A8] to-[#009F8A] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">
              <img src={logo} alt="Logo" className="w-6 h-6" />
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Aloca.id</h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola keuanganmu dengan kantong
          </p>
        </div>

        <div className="w-full">
          <h2 className="mb-1 text-2xl font-bold text-gray-900">
            Selamat Datang
          </h2>

          <p className="mb-8 text-sm text-gray-500">
            Masuk ke akun Aloca.id kamu
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isSubmitting}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                disabled={isSubmitting}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 right-3 top-10 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              type="submit"
              size="full"
              className="mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-[#00C2A8] font-semibold hover:underline"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
