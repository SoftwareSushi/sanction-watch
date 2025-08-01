import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type EntityType = 'person' | 'business';

interface PersonForm {
	firstName: string;
	lastName: string;
	email: string;
	birthday: string;
	ssn: string;
	phoneNumbers: string[];
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
	countryOfOperation: string;
	typeOfGoodsServices: string;
	natureOfRelationship: string;
}

interface BusinessForm {
	businessName: string;
	phoneNumbers: string[];
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
	countryOfOperation: string;
	typeOfGoodsServices: string;
	natureOfRelationship: string;
}

export default function NewCheck() {
	const navigate = useNavigate();
	const [entityType, setEntityType] = useState<EntityType>('business');
	const [personForm, setPersonForm] = useState<PersonForm>({
		firstName: '',
		lastName: '',
		email: '',
		birthday: '',
		ssn: '',
		phoneNumbers: [''],
		address: { street: '', city: '', state: '', zip: '' },
		countryOfOperation: '',
		typeOfGoodsServices: '',
		natureOfRelationship: '',
	});
	const [businessForm, setBusinessForm] = useState<BusinessForm>({
		businessName: '',
		phoneNumbers: [''],
		address: { street: '', city: '', state: '', zip: '' },
		countryOfOperation: '',
		typeOfGoodsServices: '',
		natureOfRelationship: '',
	});

	const addPhoneNumber = () => {
		if (entityType === 'person') {
			setPersonForm((prev) => ({
				...prev,
				phoneNumbers: [...prev.phoneNumbers, ''],
			}));
		} else {
			setBusinessForm((prev) => ({
				...prev,
				phoneNumbers: [...prev.phoneNumbers, ''],
			}));
		}
	};

	const updatePhoneNumber = (index: number, value: string) => {
		if (entityType === 'person') {
			setPersonForm((prev) => ({
				...prev,
				phoneNumbers: prev.phoneNumbers.map((phone, i) =>
					i === index ? value : phone
				),
			}));
		} else {
			setBusinessForm((prev) => ({
				...prev,
				phoneNumbers: prev.phoneNumbers.map((phone, i) =>
					i === index ? value : phone
				),
			}));
		}
	};

	const removePhoneNumber = (index: number) => {
		if (entityType === 'person') {
			setPersonForm((prev) => ({
				...prev,
				phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
			}));
		} else {
			setBusinessForm((prev) => ({
				...prev,
				phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
			}));
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// Navigate to processing page
		navigate('/processing', {
			state: {
				entityType,
				data: entityType === 'person' ? personForm : businessForm,
			},
		});
	};

	const phoneNumbers =
		entityType === 'person'
			? personForm.phoneNumbers
			: businessForm.phoneNumbers;

	return (
		<div
			className="min-h-screen"
			style={{ backgroundColor: 'var(--bg-primary)' }}
		>
			{/* Modern Header */}
			<header
				style={{
					backgroundColor: 'var(--bg-secondary)',
					borderBottom: '1px solid var(--border-primary)',
				}}
			>
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center space-x-4">
						<button
							onClick={() => navigate('/dashboard')}
							className="btn btn-ghost"
						>
							<svg
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<div className="flex items-center space-x-3">
							<div
								className="w-8 h-8 rounded-lg flex items-center justify-center"
								style={{ backgroundColor: 'var(--text-primary)' }}
							>
								<svg
									className="h-5 w-5"
									style={{ color: 'var(--bg-primary)' }}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h1
								className="text-xl font-semibold"
								style={{ color: 'var(--text-primary)' }}
							>
								New Entity Risk Scanner
							</h1>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-4xl mx-auto px-6 py-8">
				<form onSubmit={handleSubmit} className="space-y-8">
					{/* Entity Type Selection */}
					<div className="card">
						<div className="card-header">
							<h2
								className="text-xl font-semibold"
								style={{ color: 'var(--text-primary)' }}
							>
								Select Entity Type
							</h2>
						</div>
						<div className="card-body">
							<div className="grid grid-cols-2 gap-4">
								<label
									className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all"
									style={{
										borderColor:
											entityType === 'business'
												? 'var(--color-blue-500)'
												: 'var(--border-primary)',
										backgroundColor:
											entityType === 'business'
												? 'var(--color-blue-50)'
												: 'transparent',
									}}
								>
									<input
										type="radio"
										name="entityType"
										value="business"
										checked={entityType === 'business'}
										onChange={(e) =>
											setEntityType(e.target.value as EntityType)
										}
										className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
									/>
									<div className="ml-3">
										<div
											className="text-base font-medium"
											style={{ color: 'var(--text-primary)' }}
										>
											Business
										</div>
										<div
											className="text-base"
											style={{ color: 'var(--text-tertiary)' }}
										>
											Company entity risk scan
										</div>
									</div>
								</label>
								<label
									className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all"
									style={{
										borderColor:
											entityType === 'person'
												? 'var(--color-blue-500)'
												: 'var(--border-primary)',
										backgroundColor:
											entityType === 'person'
												? 'var(--color-blue-50)'
												: 'transparent',
									}}
								>
									<input
										type="radio"
										name="entityType"
										value="person"
										checked={entityType === 'person'}
										onChange={(e) =>
											setEntityType(e.target.value as EntityType)
										}
										className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
									/>
									<div className="ml-3">
										<div
											className="text-base font-medium"
											style={{ color: 'var(--text-primary)' }}
										>
											Person
										</div>
										<div
											className="text-base"
											style={{ color: 'var(--text-tertiary)' }}
										>
											Individual entity risk scan
										</div>
									</div>
								</label>
							</div>
						</div>
					</div>

					{/* Dynamic Form */}
					{entityType === 'person' ? (
						<div className="card">
							<div className="card-header">
								<h2
									className="text-xl font-semibold"
									style={{ color: 'var(--text-primary)' }}
								>
									Person Information
								</h2>
							</div>
							<div className="card-body space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="form-label">First Name</label>
										<input
											type="text"
											required
											value={personForm.firstName}
											onChange={(e) =>
												setPersonForm((prev) => ({
													...prev,
													firstName: e.target.value,
												}))
											}
											className="form-input"
											placeholder="Enter first name"
										/>
									</div>
									<div>
										<label className="form-label">Last Name</label>
										<input
											type="text"
											required
											value={personForm.lastName}
											onChange={(e) =>
												setPersonForm((prev) => ({
													...prev,
													lastName: e.target.value,
												}))
											}
											className="form-input"
											placeholder="Enter last name"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="form-label">Email</label>
										<input
											type="email"
											required
											value={personForm.email}
											onChange={(e) =>
												setPersonForm((prev) => ({
													...prev,
													email: e.target.value,
												}))
											}
											className="form-input"
											placeholder="Enter email address"
										/>
									</div>
									<div>
										<label className="form-label">Birthday</label>
										<input
											type="date"
											required
											value={personForm.birthday}
											onChange={(e) =>
												setPersonForm((prev) => ({
													...prev,
													birthday: e.target.value,
												}))
											}
											className="form-input"
										/>
									</div>
								</div>

								<div>
									<label className="form-label">SSN</label>
									<input
										type="password"
										required
										value={personForm.ssn}
										onChange={(e) =>
											setPersonForm((prev) => ({ ...prev, ssn: e.target.value }))
										}
										placeholder="XXX-XX-XXXX"
										className="form-input"
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="form-label">Country of Operation</label>
										<input
											type="text"
											required
											value={personForm.countryOfOperation}
											onChange={(e) =>
												setPersonForm((prev) => ({
													...prev,
													countryOfOperation: e.target.value,
												}))
											}
											className="form-input"
											placeholder="Enter country of operation"
										/>
									</div>
									<div>
										<label className="form-label">
											Type of Goods/Services Involved
										</label>
										<input
											type="text"
											required
											value={personForm.typeOfGoodsServices}
											onChange={(e) =>
												setPersonForm((prev) => ({
													...prev,
													typeOfGoodsServices: e.target.value,
												}))
											}
											className="form-input"
											placeholder="Enter type of goods or services"
										/>
									</div>
								</div>

								<div>
									<label className="form-label">Nature of Relationship</label>
									<select
										required
										value={personForm.natureOfRelationship}
										onChange={(e) =>
											setPersonForm((prev) => ({
												...prev,
												natureOfRelationship: e.target.value,
											}))
										}
										className="form-input"
									>
										<option value="">Select nature of relationship</option>
										<option value="Supplier">Supplier</option>
										<option value="Vendor">Vendor</option>
										<option value="JV Partner">JV Partner</option>
										<option value="Customer">Customer</option>
										<option value="Contractor">Contractor</option>
										<option value="Employee">Employee</option>
										<option value="Consultant">Consultant</option>
										<option value="Other">Other</option>
									</select>
								</div>

								{/* Phone Numbers */}
								<div>
									<label className="form-label">Phone Numbers</label>
									<div className="space-y-3">
										{phoneNumbers.map((phone, index) => (
											<div key={index} className="flex gap-3">
												<input
													type="tel"
													value={phone}
													onChange={(e) =>
														updatePhoneNumber(index, e.target.value)
													}
													placeholder="(555) 123-4567"
													className="form-input flex-1"
												/>
												{phoneNumbers.length > 1 && (
													<button
														type="button"
														onClick={() => removePhoneNumber(index)}
														className="btn btn-ghost text-red-600 hover:text-red-700"
													>
														Remove
													</button>
												)}
											</div>
										))}
										<button
											type="button"
											onClick={addPhoneNumber}
											className="btn btn-ghost text-blue-600 hover:text-blue-700 text-base"
										>
											+ Add Phone Number
										</button>
									</div>
								</div>

								{/* Address */}
								<div>
									<label className="form-label">Address</label>
									<div className="space-y-4">
										<input
											type="text"
											placeholder="Street Address"
											value={personForm.address.street}
											onChange={(e) =>
												setPersonForm((prev) => ({
													...prev,
													address: { ...prev.address, street: e.target.value },
												}))
											}
											className="form-input"
										/>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<input
												type="text"
												placeholder="City"
												value={personForm.address.city}
												onChange={(e) =>
													setPersonForm((prev) => ({
														...prev,
														address: { ...prev.address, city: e.target.value },
													}))
												}
												className="form-input"
											/>
											<input
												type="text"
												placeholder="State"
												value={personForm.address.state}
												onChange={(e) =>
													setPersonForm((prev) => ({
														...prev,
														address: { ...prev.address, state: e.target.value },
													}))
												}
												className="form-input"
											/>
											<input
												type="text"
												placeholder="ZIP Code"
												value={personForm.address.zip}
												onChange={(e) =>
													setPersonForm((prev) => ({
														...prev,
														address: { ...prev.address, zip: e.target.value },
													}))
												}
												className="form-input"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="card">
							<div className="card-header">
								<h2
									className="text-xl font-semibold"
									style={{ color: 'var(--text-primary)' }}
								>
									Business Information
								</h2>
							</div>
							<div className="card-body space-y-6">
								<div>
									<label className="form-label">Business Name</label>
									<input
										type="text"
										required
										value={businessForm.businessName}
										onChange={(e) =>
											setBusinessForm((prev) => ({
												...prev,
												businessName: e.target.value,
											}))
										}
										className="form-input"
										placeholder="Enter business name"
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="form-label">Country of Operation</label>
										<input
											type="text"
											required
											value={businessForm.countryOfOperation}
											onChange={(e) =>
												setBusinessForm((prev) => ({
													...prev,
													countryOfOperation: e.target.value,
												}))
											}
											className="form-input"
											placeholder="Enter country of operation"
										/>
									</div>
									<div>
										<label className="form-label">
											Type of Goods/Services Involved
										</label>
										<input
											type="text"
											required
											value={businessForm.typeOfGoodsServices}
											onChange={(e) =>
												setBusinessForm((prev) => ({
													...prev,
													typeOfGoodsServices: e.target.value,
												}))
											}
											className="form-input"
											placeholder="Enter type of goods or services"
										/>
									</div>
								</div>

								<div>
									<label className="form-label">Nature of Relationship</label>
									<select
										required
										value={businessForm.natureOfRelationship}
										onChange={(e) =>
											setBusinessForm((prev) => ({
												...prev,
												natureOfRelationship: e.target.value,
											}))
										}
										className="form-input"
									>
										<option value="">Select nature of relationship</option>
										<option value="Supplier">Supplier</option>
										<option value="Vendor">Vendor</option>
										<option value="JV Partner">JV Partner</option>
										<option value="Customer">Customer</option>
										<option value="Contractor">Contractor</option>
										<option value="Employee">Employee</option>
										<option value="Consultant">Consultant</option>
										<option value="Other">Other</option>
									</select>
								</div>

								{/* Phone Numbers */}
								<div>
									<label className="form-label">Phone Numbers</label>
									<div className="space-y-3">
										{phoneNumbers.map((phone, index) => (
											<div key={index} className="flex gap-3">
												<input
													type="tel"
													value={phone}
													onChange={(e) =>
														updatePhoneNumber(index, e.target.value)
													}
													placeholder="(555) 123-4567"
													className="form-input flex-1"
												/>
												{phoneNumbers.length > 1 && (
													<button
														type="button"
														onClick={() => removePhoneNumber(index)}
														className="btn btn-ghost text-red-600 hover:text-red-700"
													>
														Remove
													</button>
												)}
											</div>
										))}
										<button
											type="button"
											onClick={addPhoneNumber}
											className="btn btn-ghost text-blue-600 hover:text-blue-700 text-base"
										>
											+ Add Phone Number
										</button>
									</div>
								</div>

								{/* Address */}
								<div>
									<label className="form-label">Business Address</label>
									<div className="space-y-4">
										<input
											type="text"
											placeholder="Street Address"
											value={businessForm.address.street}
											onChange={(e) =>
												setBusinessForm((prev) => ({
													...prev,
													address: { ...prev.address, street: e.target.value },
												}))
											}
											className="form-input"
										/>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<input
												type="text"
												placeholder="City"
												value={businessForm.address.city}
												onChange={(e) =>
													setBusinessForm((prev) => ({
														...prev,
														address: { ...prev.address, city: e.target.value },
													}))
												}
												className="form-input"
											/>
											<input
												type="text"
												placeholder="State"
												value={businessForm.address.state}
												onChange={(e) =>
													setBusinessForm((prev) => ({
														...prev,
														address: { ...prev.address, state: e.target.value },
													}))
												}
												className="form-input"
											/>
											<input
												type="text"
												placeholder="ZIP Code"
												value={businessForm.address.zip}
												onChange={(e) =>
													setBusinessForm((prev) => ({
														...prev,
														address: { ...prev.address, zip: e.target.value },
													}))
												}
												className="form-input"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Submit Button */}
					<div className="card">
						<div className="card-body">
							<button
								type="submit"
								className="w-full btn btn-primary"
								style={{ padding: '16px 24px', fontSize: '16px' }}
							>
								Submit Entity Risk Scanner
							</button>
						</div>
					</div>
				</form>
			</main>
		</div>
	);
}
