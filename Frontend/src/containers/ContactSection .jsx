const ContactSection = () => {
	return (
		<section className='py-16' id='contact'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl font-bold mb-14 text-center'>Contact Us</h2>
				<div className='flex flex-col items-center md:flex-row gap-8 lg:px-24  px-2'>
					<div className='w-full md:w-1/2'>
						<h3 className='text-2xl font-semibold mb-4'>Get In Touch</h3>
						<p className='text-lg text-gray-700 mb-4'>
							Address: 1234 Street Name, City, Country
							<br />
							Phone: +1 234 567890
							<br />
							Email: info@example.com
						</p>
					</div>
					<div className='w-full md:w-1/2'>
						<form className='flex flex-col gap-4'>
							<input
								type='text'
								placeholder='Your Name'
								className='border rounded-md px-4 py-2  border-zinc-950'
							/>
							<input
								type='email'
								placeholder='Your Email'
								className='border rounded-md px-4 py-2 border-zinc-950'
							/>
							<textarea
								placeholder='Your Message'
								rows='4'
								className='border rounded-md px-4 py-2 border-zinc-950'
							></textarea>
							<button
								href='#'
								className='flex-1 bg-red-700 text-white text-center py-2 rounded-md font-semibold hover:bg-red-00 transition duration-300'
							>
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
