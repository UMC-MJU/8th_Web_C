import React, { memo, useState } from 'react'
import type { MovieFilters } from '../types/movie'
import { Input } from './Input';
import { SelectBox } from './SelectBox';
import LanguageSelector from './LanguageSelector';
import { LANGUAGE_OPTIONS } from '../constants/movie';

interface MovieFilterProps {
    onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps): React.ReactElement => {
    console.log("MovieFilter 렌더링");
    const [query, setQuery] = useState<string>("");
    const [includeAdult, setIncludeAdult] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>("ko-KR");

    const handleSubmit = () => {
        const filters: MovieFilters = {
            query,
            include_adult: includeAdult,
            language,
        }
        onChange(filters);
    }

    return (
        <div className='transform space-y-6 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl'>
            <div className='flex flex-wrap gap-6'>
                <div className='min-w-[450px] flex-1'>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                        영화 제목
                    </label>
                    <Input value={query} onChange={setQuery} />
                </div>
                <div className='min-w-[250px] flex-1'>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                        옵션
                    </label>
                    <SelectBox
                        checked={includeAdult}
                        onChange={setIncludeAdult}
                        label="성인 콘텐츠 포함"
                        id="include-adult"
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div className='min-w-[250px] flex-1'>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                        옵션
                    </label>
                    <LanguageSelector
                        value={language}
                        onChange={setLanguage}
                        options={LANGUAGE_OPTIONS}
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div className="pt-4">
                    <button onClick={handleSubmit}>영화 검색</button>
                </div>
            </div>
        </div>
    )
}

export default memo(MovieFilter)
