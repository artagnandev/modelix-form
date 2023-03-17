import { FormEvent, useState } from 'react'
import { logoImg, presentationImg1, presentationImg2, robotImg } from './assets';

import { string } from 'yup';

import {
  gmail,
  whatsapp,
  facebook,
  instagram,
  tiktok,
  youtube,
} from './assets/icons'
import { validate, scroll } from './helpers';
import api from './services/api';

const initialFields = {
  name: '',
  email: '',
  office: '',
  institution: '',
}

const schema = {
  name: string().required('Este campo é obrigatório'),
  email: string().email('Preencha um e-mail válido').required('Este campo é obrigatório'),
  office: string().required('Este campo é obrigatório'),
}

function App() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState(initialFields);
  const [errors, setErrors] = useState(initialFields);
  const [loading, setLoading] = useState(false);

  const socials = [
    {
      name: 'Gmail',
      link: 'mailto:vendas@modelix.com.br',
      icon: gmail,
    },
    {
      name: 'Whatsapp',
      link: 'https://api.whatsapp.com/send?1=pt_BR&phone=5511962095761&text=Ol%C3%A1,%20Visitei%20o%20site%20da%20Modelix%20Robotics.%20Gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es...',
      icon: whatsapp,
    },
    {
      name: 'TikTok',
      link: 'https://www.tiktok.com/@modelix_robotics',
      icon: tiktok,
    },
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/ModelixRobotics/',
      icon: facebook,
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/modelix_robotics/',
      icon: instagram,
    },
    {
      name: 'Youtube',
      link: 'https://www.youtube.com/user/Modelix08',
      icon: youtube,
    },
  ]

  const slides = [
    presentationImg1,
    presentationImg2,
    presentationImg1,
    presentationImg2,
  ]

  const inputs = [
    {
      key: 'name',
      label: 'Seu nome',
    },
    {
      key: 'email',
      label: 'Seu e-mail',
    },
    {
      key: 'office',
      label: 'Sua ocupação',
    },
    {
      key: 'institution',
      label: 'Sua instituição',
    }
  ];

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    await validate
      .request(form, schema)
      .then(async () => {
        setSent(true)
        setForm(initialFields)
        setLoading(false)

        api.post('/endpoint', form)
          .then(() => {
            // setSent(true)
            // setForm(initialFields)
            // setLoading(false)
          })
          .catch(() => console.log('Deu errado'))
      })
      .catch((err: Error) => {
        const messages = validate.error(err);

        if (messages) setErrors(messages as typeof initialFields);
      })
      .finally(() => setLoading(false));
  }

  window.onscroll = () => scroll();

  return (
    <div className="view">
      <header id="header" className="header w-full py-[30px] fixed top-0 z-10 bg-white transition-all duration-300">
        <div className="container flex items-center justify-between">
          <img src={logoImg} alt="" className="logo h-[50px] transition-all duration-300" />

          <div className="socials flex gap-4">
            {
              socials.map(({ name, link, icon}) => (
                <a key={name} title={name} href={link} target="_blank" className="w-[30px] h-[30px] transition-all duration-300">
                  <img src={icon} alt="" className="h-full w-full" />
                </a>
              ))
            }
          </div>
        </div>
      </header>

      <section className="about mt-[190px]">
        <div className="container flex justify-between">
          <div className="flex flex-col mr-4 w-full max-w-[510px]">
            <h2 className="text-2xl font-jakarta font-bold text-[#1F2937] mb-7">
              Leve a robótica para a sala de aula
            </h2>

            <p className="text-base font-inter font-regular text-[#9CA3AF] mb-4 text-justify">
              A <b>Modelix Robotics</b> é uma empresa genuinamente nacional, que <b>fabrica, 
              desenvolve e comercializa kits para ensino de Robótica Educacional</b> há mais 15 anos.
            </p>

            <p className="text-md font-inter font-regular text-[#9CA3AF] text-justify">
              O principal objetivo da Modelix Robotics é fornecer o que há de mais avançado na Robótica Educacional 
              de forma com que o professor não tenha dificuldades em lecionar a matéria fazendo com que o 
              aluno consiga extrair todos os benefícios desta atividade.
            </p>
          </div>

          <img
            alt=""
            src={robotImg}
            className="mt-6 w-[200px] min-w-[200px] h-[250px]"
          />
        </div>
      </section>

      <section className="images mt-[100px] overflow-hidden">
        <div className="container flex overflow-x-scroll pb-2">
          {
            slides.map((img) => (
              <div
                key={Math.random()}
                className="w-[300px] min-w-[300px] h-[200px] rounded-lg overflow-hidden mr-4"
              >
                <img
                  alt=""
                  src={img}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          }
        </div>
      </section>

      <section className="contact mt-[100px]">
        <div className="container">
          <h2 className="text-2xl font-jakarta font-bold text-[#1F2937] mb-7">
            Entre em contato
          </h2>

          <p className="text-base font-inter font-regular text-[#4B5563] mb-8">
            Retornaremos assim que possível.
          </p>

          <form onSubmit={submit} className="w-full py-8 px-8 rounded-lg bg-gray-50 relative">
            <div className={sent ? 'invisible' : 'visible'}>
              {
                inputs.map(({ key, label }) => (
                  <div className="block mb-3">
                    <span className="block text-sm font-regular text-slate-700 mb-1">
                      {label}
                    </span>

                    <input
                      type="text"
                      name={key}
                      value={form[key as keyof typeof initialFields]}
                      onFocus={(e) => setErrors({ ...errors, [key]: '' })}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className={`${!!errors[key as keyof typeof initialFields] ? 'border-pink-600' : 'border-gray-200'} text-slate-700 border border-solid py-3 px-4 rounded-md w-full outline-blue-500 text-sm`}
                    />

                    <p className={`${!!errors[key as keyof typeof initialFields] ? 'h-[20px]' : 'h-0'} mt-1 text-pink-600 text-xs pointer-events-none overflow-hidden transition-all`}>
                      {errors[key as keyof typeof initialFields]}
                    </p>
                  </div>
                ))
              }

              <button
                type="submit"
                className="mt-5 w-full py-3 px-4 rounded-lg bg-blue-500 text-white transition-all hover:bg-blue-600"
              >
                {loading ? 'Enviando' : 'Enviar'}
              </button>
            </div>

            <div className={`${sent ? 'visible' : 'invisible'} absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 w-[80%] p-4 rounded-md border border-green-600 bg-green-100 transition-all`}>
              <p className="text-green-600 text-center font-jakarta">
                Formulário enviado com sucesso!
              </p>
            </div>
          </form>
        </div>
      </section>

      <footer className="footer mt-20 mb-7">
        <div className="container flex justify-between items-stretch">
          <div className="flex flex-col">
            <a href="mailto:vendas@modelix.com.br" target="_blank" className="text-sm text-gray-400 hover:text-blue-500">
              <b>E-mail:</b> vendas@modelix.com.br
            </a>

            <a href="tel:+551126674254" target="_blank" className="text-sm text-gray-400 hover:text-blue-500">
              <b>Telefone:</b> (11) 2667-4254
            </a>

            <a href="https://goo.gl/maps/8FLickGW61Xq4GUp6" target="_blank" className="text-sm text-gray-400 hover:text-blue-500">
              <b>Endereço:</b> R. Lopes de Oliveira, 655 - Barra Funda, São Paulo - SP, 01152-010
            </a>
          </div>

          <a
            href="https://www.modelix.com.br"
            target="_blank"
            className="button h-full py-3 px-4 rounded-lg border-2 border-blue-500 text-blue-500 transition-all hover:bg-blue-100"
          >
            Visite o nosso site
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
