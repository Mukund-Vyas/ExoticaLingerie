import { useRef, useState } from 'react';
import api from '@/src/utils/api';
import toast, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'jodit/es2021.en/jodit.min.css';

// Dynamically import Jodit to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const BlogForm = () => {
    const editor = useRef(null);
    const [joditContent, setJoditContent] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [categories, setCategories] = useState('');
    const [subTopics, setSubTopics] = useState([{ subHeading: '', subText: '', subImage: '', actionButton: { text: '', link: '' } }]);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const config = {
        readonly: false, // Enable editing
        uploader: {
            insertImageAsBase64URI: true, // Optional, uploads images as Base64
        },
        buttons: [
            'source', 'bold', 'italic', 'underline', 'strikethrough', 'eraser', 'ul', 'ol', 'outdent', 'indent',
            'font', 'fontsize', 'brush', 'paragraph', 'align', 'undo', 'redo', 'table', 'image', 'file', 'link',
            'hr', 'copyformat', 'selectall', 'cut', 'copy', 'paste', 'fullsize', 'print'
        ],
    };


    const addSubTopic = () => {
        setSubTopics([...subTopics, { subHeading: '', subText: '', subImage: '', actionButton: { text: '', link: '' } }]);
    };

    const removeSubTopic = (index) => {
        const updatedSubTopics = subTopics.filter((_, i) => i !== index);
        setSubTopics(updatedSubTopics);
    };

    const addTag = () => {
        const newTag = tagInput.trim().toLowerCase();

        if (newTag !== '' && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
        }

        setTagInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault();  // Prevent default tab behavior
            addTag();  // Call the addTag function
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Start loading
        try {
            const blogData = {
                mainHeading: title,
                mainText: content,
                mainImage,
                categories,
                subTopics,
                tags
            };
            await api.post('/blog', blogData);
            toast.success('Blog posted successfully!'); // Success toast

            // Clear the inputs after successful submission
            setTitle('');
            setContent('');
            setMainImage('');
            setSubTopics([{ subHeading: '', subText: '', subImage: '', actionButton: { text: '', link: '' } }]);
            setTags([]);

        } catch (error) {
            toast.error('Failed to post the blog. Please try again.'); // Error toast
        } finally {
            setIsSubmitting(false); // End loading
        }
    };

    const handleJoditSubmit = async () => {
        try {
            const response = await fetch('/api/save-blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ joditContent }),
            });

            if (response.ok) {
                console.log('Blog saved successfully');
            } else {
                console.error('Failed to save blog');
            }
        } catch (error) {
            console.error('Error submitting the blog:', error);
        }
    };

    return (
        <div className='p-6'>
            <Toaster position="bottom-center" reverseOrder={false} />
            <h1 className='w-full text-center font-serif py-4 font-bold text-primary text-2xl'>Create a New Blog.</h1>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white border border-slate-500 rounded-lg">
                <div>
                    <label className='font-medium'>Main Heading:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className='font-medium'>Main Text:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border p-2 w-full"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className='font-medium'>Main Image URL:</label>
                    <input
                        type="text"
                        value={mainImage}
                        onChange={(e) => setMainImage(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className='font-medium'>Blog Category:</label>
                    <select
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        className="border p-2 w-full"
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Quizzes">Quizzes</option>
                        <option value="Listicles">Listicles</option>
                    </select>
                </div>
                {/* Tags Section */}
                <div className="mt-4">
                    <label className='font-medium'>Tags:</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Add a tag"
                            className="border p-2 flex-grow"
                        />
                        <button
                            type="button"
                            onClick={addTag}
                            className="bg-blue-500 text-white px-4 py-2"
                        >
                            Add Tag
                        </button>
                    </div>
                    <div className="mt-2 flex flex-wrap space-x-2">
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 px-3 py-1 rounded-full flex items-center space-x-2 my-1"
                            >
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="text-red-500"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* SubTopics Section */}
                {subTopics.map((sub, index) => (
                    <div key={"sub section" + index} className="mt-4">
                        <h3 className='font-bold'>Sub Topic {index + 1}</h3>
                        <div className='p-4 border border-slate-500 rounded-lg'>
                            <div>
                                <label>Sub Heading:</label>
                                <input
                                    type="text"
                                    value={sub.subHeading}
                                    onChange={(e) => {
                                        const updated = [...subTopics];
                                        updated[index].subHeading = e.target.value;
                                        setSubTopics(updated);
                                    }}
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label>Sub Text:</label>
                                <textarea
                                    value={sub.subText}
                                    onChange={(e) => {
                                        const updated = [...subTopics];
                                        updated[index].subText = e.target.value;
                                        setSubTopics(updated);
                                    }}
                                    className="border p-2 w-full"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label>Sub Image URL (optional):</label>
                                <input
                                    type="text"
                                    value={sub.subImage}
                                    onChange={(e) => {
                                        const updated = [...subTopics];
                                        updated[index].subImage = e.target.value;
                                        setSubTopics(updated);
                                    }}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div>
                                <label>Action Button Text (optional):</label>
                                <input
                                    type="text"
                                    value={sub.actionButton.text}
                                    onChange={(e) => {
                                        const updated = [...subTopics];
                                        updated[index].actionButton.text = e.target.value;
                                        setSubTopics(updated);
                                    }}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div>
                                <label>Action Button Link (optional):</label>
                                <input
                                    type="text"
                                    value={sub.actionButton.link}
                                    onChange={(e) => {
                                        const updated = [...subTopics];
                                        updated[index].actionButton.link = e.target.value;
                                        setSubTopics(updated);
                                    }}
                                    className="border p-2 w-full"
                                />
                            </div>
                            {/* Remove button for subtopic, only if more than one exists */}
                            {subTopics.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeSubTopic(index)}
                                    className="mt-4 bg-red-500 text-white px-4 py-2"
                                >
                                    Remove Subtopic
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addSubTopic} className="mt-4 bg-blue-500 text-white px-4 py-2">
                    Add Another SubTopic
                </button>

                <button
                    type="submit"
                    className={`mt-4 px-4 py-2 text-white ${isSubmitting ? 'bg-gray-500' : 'bg-green-500'}`}
                    disabled={isSubmitting} // Disable button while submitting
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Blog'} {/* Change text based on loading state */}
                </button>
            </form>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 font-serif">Create Blog Post</h1>
                <JoditEditor
                    ref={editor}
                    value={joditContent}
                    config={config}
                    onBlur={(newContent) => setJoditContent(newContent)} // On editor blur, set content
                />
                <button
                    onClick={handleJoditSubmit}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Still in development...
                </button>
            </div>
        </div>
    );
};

export default BlogForm;