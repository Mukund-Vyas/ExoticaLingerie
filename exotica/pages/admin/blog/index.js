import { useState } from 'react';
import axios from 'axios';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [subTopics, setSubTopics] = useState([{ subHeading: '', subText: '', subImage: '', actionButton: { text: '', link: '' } }]);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const addSubTopic = () => {
        setSubTopics([...subTopics, { subHeading: '', subText: '', subImage: '', actionButton: { text: '', link: '' } }]);
    };

    const removeSubTopic = (index) => {
        const updatedSubTopics = subTopics.filter((_, i) => i !== index);
        setSubTopics(updatedSubTopics);
    };

    const addTag = () => {
        if (tagInput.trim() !== '') {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const blogData = { title, content, mainImage, subTopics };
            await axios.post('/api/blogs', blogData);
            // Handle success (show toast or redirect)
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div className='p-6'>
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

                {/* Tags Section */}
                <div className="mt-4">
                    <label className='font-medium'>Tags:</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
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
                                className="bg-gray-200 px-3 py-1 rounded-full flex items-center space-x-2"
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
                    <div key={index} className="mt-4">
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

                <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2">
                    Submit Blog
                </button>
            </form>
        </div>
    );
};

export default BlogForm;