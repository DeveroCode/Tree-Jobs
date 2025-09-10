// src/components/PoverNotification.tsx
import type { CandidateInformation } from '@/types/index';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

type PoverOptionsCandidateProps = {
    cv: CandidateInformation[number]['candidate']['cv'],
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsRejectOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function PoverOptionsCandidate({ cv, setIsOpen, setIsRejectOpen }: PoverOptionsCandidateProps) {
    return (
        <Popover className="relative">
            <PopoverButton className="relative">
                <EllipsisHorizontalCircleIcon className="w-6 h-6 text-purple-button cursor-pointer" />
            </PopoverButton>

            <PopoverPanel className="absolute right-0 z-10 mt-2 w-44 bg-white rounded-md shadow-lg border border-gray-200">
                <section className='border-b border-gray-200'>
                   <ol>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Profile</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setIsOpen(true)} >Status Update</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setIsRejectOpen(true)}>Delete</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => window.open(cv, '_blank')}>Download CV</li>
                   </ol>
                </section>
            </PopoverPanel>
        </Popover>
    );
}
