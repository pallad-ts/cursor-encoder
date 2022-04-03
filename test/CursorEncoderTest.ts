import {JSONAdapter, Serializer, normalizer} from 'alpha-serializer';
import {CursorEncoder} from "@src/CursorEncoder";
import {create, ID} from '@pallad/id';
import * as sinon from 'sinon';
import {Cursor} from "@src/Cursor";
import {ERRORS} from "@src/errors";

describe('CursorEncoder', () => {
	let cursorEncoder: CursorEncoder;
	let serializer: Serializer;

	const CURSOR: Cursor = {
		i: create(),
		k: 'sortableValue'
	};

	beforeEach(() => {
		serializer = new Serializer(new JSONAdapter(), normalizer);
		cursorEncoder = new CursorEncoder(serializer);
	});


	describe('decode', () => {
		describe('fails', () => {
			it('due encoding', () => {
				expect(() => {
					cursorEncoder.decode('completely-invalid-base64_for_SURE!:)');
				})
					.toThrowError(ERRORS.INVALID_ENCODING.defaultMessage);
			});

			it.each<[any]>([
				[{foo: 'bar'}],
				[{i: ['test']}]
			])('due to invalid structure of serializable string: %s', input => {
				expect(() => {
					cursorEncoder.decode(
						Buffer.from(serializer.serialize(input), 'utf8').toString('base64')
					)
				})
					.toThrowError(ERRORS.INVALID_CURSOR_STRUCTURE.defaultMessage);
			});
		});

		it('success', () => {
			const result = cursorEncoder.decode(
				cursorEncoder.encode(CURSOR)
			);
			expect(result)
				.toStrictEqual(CURSOR);
		});
	});

	describe('encode', () => {
		it.each<[Cursor]>([
			[{k: new Date(), i: create()}],
			[{k: 10, i: create()}]
		])('success: %s', cursor => {
			const encoded = cursorEncoder.encode(cursor);
			const decoded = cursorEncoder.decode(encoded);

			expect(decoded)
				.toStrictEqual(cursor);
		});

		it('uses provided serializer instead default one', () => {
			const serializer = sinon.createStubInstance(Serializer);
			const encoder = new CursorEncoder(serializer as unknown as Serializer);
			const dummyResult = 'somestring';
			serializer.serialize
				.returns(dummyResult);

			const cursor: Cursor = {i: 'test'};

			const result = encoder.encode(cursor);
			expect(result)
				.toEqual(Buffer.from(dummyResult, 'utf8').toString('base64'))
		})
	});
});
