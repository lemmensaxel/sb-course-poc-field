import './example.css'
import { FunctionComponent } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'
import CourseSelector from './CourseSelector'

const CourseSelectorPlugin: FunctionComponent = () => {
  const { type, data, actions } = useFieldPlugin({
    enablePortalModal: true,
    validateContent: (content: unknown) => ({
      content: typeof content === 'string' ? content : '',
    }),
  })

  if (type !== 'loaded') {
    return null
  }

  const closeModal = () => {
    actions.setModalOpen(false)
  }

  return (
    <div>
      {data.isModalOpen && (
        <button
          type="button"
          className="btn btn-close"
          onClick={closeModal}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.75738 0.343176L0.343166 1.75739L4.58581 6.00003L0.343165 10.2427L1.75738 11.6569L6.00002 7.41424L10.2427 11.6569L11.6569 10.2427L7.41423 6.00003L11.6569 1.75739L10.2427 0.343176L6.00002 4.58582L1.75738 0.343176Z"
              fill="#1B243F"
            />
          </svg>
          <span className="sr-only">Close Modal</span>
        </button>
      )}
      <div className="container">
        <CourseSelector
          token={data.options.token}
          getUserContext={actions.requestUserContext}
          onSelect={actions.setContent}
          selectedCourse={data.content}
        />
      </div>
    </div>
  )
}

export default CourseSelectorPlugin
