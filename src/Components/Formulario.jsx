import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../assets/hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

const InoutSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #747dfe;
        cursor: pointer;
    }

`

const Formulario = ({setMonedas}) => {

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas)
  const [cripto, SelectCripto] = useSelectMonedas("Elige tu Cripto", criptos)

  useEffect(() => {

    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const ArrayCoins = resultado.Data.map(coin => {
        const coinObjet = {
          id: coin.CoinInfo.Name,
          nombre: coin.CoinInfo.FullName
        }
        return coinObjet
      })
      setCriptos(ArrayCoins)
    }
    consultarAPI();
  }, [])

  const handleSubmit = e =>{
    e.preventDefault();

    if([moneda, cripto].includes('')){
      setError(true)
      return
    }
    setError(false)
    setMonedas({moneda, cripto})
  }

  return (

    <>
  {error && <Error>Todos los campos son OBLIGATORIOS</Error>}

    <form onSubmit={handleSubmit}>
      <SelectMonedas />
      <SelectCripto />


      <InoutSubmit
        type='submit'
        value="Cotizar" />

    </form>
    </>
  )
}

export default Formulario