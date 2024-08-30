import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User } from "lucide-react"
import React from "react"
import { FormEvent, useState } from "react"
export function CreateTripPage() {

  const [isGuestsInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsguestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setisConfirmTripModalOpen] = useState(false)
  
  const [emailsToinvite, setEmailsToInvite] = useState([
    '',
  
  ])

  function openGuestsInput(){
    setIsGuestInputOpen(true)
  }

  function closeGuestsInput(){
    setIsGuestInputOpen(false)
  }

  function openGuestsModal(){
    setIsguestsModalOpen(true)
  }

  function closeGuestsModal(){
    setIsguestsModalOpen(false)
  }

  function openConfirmTripModal(){
    setisConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal(){
    setisConfirmTripModalOpen(false)
  }

  function addNewEmailToIINvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email){
      return
    }

    if (emailsToinvite.includes(email)){
      return
    }

    setEmailsToInvite([
      ...emailsToinvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailToRemove: string){
    const newEmailList = emailsToinvite.filter(email => email !==emailToRemove)
      
      setEmailsToInvite(newEmailList)
  }

  return (
   <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center"> 
    <div className="max-w-3xl w-full px-6 text-center space-y-10">
      <div className="flex flex-col items-center">
        <img src="/logo.svg" alt="plann.er gap-3" />
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
      </div>
    
    <div className="space-y-4">
      <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow- gap-3">
      
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="size-5 text-zinc-400"/>
          <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none"/>
        </div>
      
        <div  className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400"/>
          <input type="text" placeholder="Quando" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"/>
        </div>

        <div className="w-px h-6 bg-zinc-800"/>
      
        {isGuestsInputOpen ? (
          
          <button onClick={closeGuestsInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
            Alterar local/data
            <Settings2 className="size-5"/>
          </button>
        ):
        (
          <button onClick={openGuestsInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
          Continuar
          <ArrowRight className="size-5"/>
        </button>
        )
        }
   
   </div>

      {isGuestsInputOpen && (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow- gap-3">
          <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1">
            <UserRoundPlus className="size-5 text-zinc-400"/>
            {emailsToinvite.length > 0 ? (
              <span className="text-zinc-100 text-lg flex-1 text-left"> {emailsToinvite.length} pessoas(s) convidadas(s)</span>
            ) : (
              <span className="text-zinc-400 text-lg flex-1 text-left">Quem estará na viagem</span>
            )}
            
          </button>
        
          
          <div className="w-px h-6 bg-zinc-800"/>
        
          <button onClick={openConfirmTripModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
            Confirmar Viagem
            <ArrowRight className="size-5"/>
          </button>
    
    </div>
    )}

  </div>
   
   <p className="text-sm text-zinc-500">
     Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
   com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
   </p>
 </div>

    {isGuestsModalOpen && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">selecionar convidados</h2>
            <button type="button" onClick={closeGuestsModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na viagem.
          </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {emailsToinvite.map(email => {
              return (
              <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{email}</span>
                <button type="button" onClick={() => removeEmailFromInvite(email)}>
                  <X className="size-4 text-zinc-400"/>
                </button>
              </div>)
            })}

              </div>

          <div className="w-full h-px bg-zinc-800"/>

          <form onSubmit={addNewEmailToIINvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="text-zinc-400 size-5"/>
            <input 
              type="email" 
              name="email" 
              placeholder="Digite o e-mail do convidado" 
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
            </div>

            <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
            Convidar
            <Plus className="size-5"/>
          </button>
          </form>
          
        </div>
      </div>
    )}

    {isConfirmTripModalOpen && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
            <button type="button" onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianopolis, Brasil</span> nas datas de  <span className="font-semibold text-zinc-100">16 27 de agosto de 2024 </span> preencha os seus dados abaixo:
          </p>
          </div>
          
          <form onSubmit={addNewEmailToIINvite} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5"/>
            <input 
              name="name" 
              placeholder="Seu nome completo" 
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
            </div>
            
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5"/>
            <input 
              type="email" 
              name="email" 
              placeholder="Seu e-mail pessoal" 
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
            </div>

            <button type="submit" className=" w-full justify-center bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400">
            Confirmar criação da viagem
            <Plus className="size-5"/>
          </button>
          </form>
          
            </div>
          </div>)
          }

      
      </div>
  )
}


