/**
 * @Author liming
 * @Date 2023/11/9 11:06
 **/

import {FC, HTMLAttributes} from 'react'
import {cva, VariantProps} from "class-variance-authority";

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>,VariantProps<typeof paragraphVariants>{}

const paragraphVariants = cva(
    'max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center',
    {
        variants:{
            size: {
                default: 'text-base sm:text-lg',
                sm:'text-sm sm:text-base',
            }
        },
        defaultVariants: {
            size: 'default'
        }
    }
)

const Paragraph: FC<ParagraphProps > = ({}) => {
    return <div>
        Paragraph1111
    </div>
}

export default Paragraph
