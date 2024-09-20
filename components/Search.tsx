"use client"

import { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import Link from 'next/link'

interface BandItem {
  _id: string;
  bandname: string;
}

const AutocompleteItem = ({ _id, bandname }: BandItem) => {
  return (
    <li>
      <Link href={`/band/${_id}`}>
        <h3 className="text-sm font-semibold">{bandname}</h3>
      </Link>
    </li>
  )
}

export default function Search(props: any) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [] as Array<{ items: BandItem[] }>,
    isOpen: false
  })

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Busca banda',
        onStateChange: ({ state }: {state:any}) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'bands-next-api',
            getItems: ({ query }: { query: string }) => {
              if (!!query) {
                return fetch(
                  `${process.env.NEXT_PUBLIC_ULR_PRODUCTION}/bands/search?bandname=${query}`
                )
                  .then((res) => {
                    if (!res.ok) {
                      throw new Error(`Error fetching data: ${res.status}`)
                    }
                    return res.json()
                  })
                  .catch((error) => {
                    console.error('Error fetching bands:', error)
                    return []
                  })
              }
              return []
            }
          }
        ],
        ...props
      }),
    [props]
  )

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  })
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
    
  })

  return (
    <form
      ref={formRef}
      className="flex justify-end w-[60%]"
      {...formProps}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
      }}
      onReset={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
      }}
    >
      <div className="flex relative p-1 bg-black w-2/6">
        <input
          ref={inputRef}
          className="flex-1 p-2 pl-4 rounded-md w-full text-black"
          {...inputProps}
        />
        {autocompleteState.isOpen && (
          <div
            className="absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-10 w-[100%]"
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection
              return (
                <section key={`section-${index}`} className='w-[100%]'>
                  {items.length > 0 && (
                    <ul className="text-black" {...autocomplete.getListProps()}>
                      {items.map((item) => (
                        <AutocompleteItem key={item._id} {...item} />
                      ))}
                    </ul>
                  )}
                </section>
              )
            })}
          </div>
        )}
      </div>
    </form>
  )
}
