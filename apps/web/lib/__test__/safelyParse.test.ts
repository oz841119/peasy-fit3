import { parseToNumber } from "../safelyParse";

describe("parseToNumber", () => {
	describe("Cannot be parsed", () => {
		it("should return fallback when target is empty string", () => {
			expect(parseToNumber("", null)).toBe(null);
		});
		it("should return fallback when target is null", () => {
			expect(parseToNumber(null, undefined)).toBe(undefined);
		});

		it("should return fallback when target is undefined", () => {
			expect(parseToNumber(undefined, false)).toBe(false);
		});
		it("should return fallback when target is empty array", () => {
			expect(parseToNumber([], undefined)).toBe(undefined);
		});
		it("should return fallback when target is empty object", () => {
			expect(parseToNumber({}, undefined)).toBe(undefined);
		});
		it("should return fallback when target is empty object", () => {
			expect(parseToNumber({}, undefined)).toBe(undefined);
		});
		it("should return fallback when target is a string that cannot be parsed", () => {
			expect(parseToNumber("abc", undefined)).toBe(undefined);
		});
		it("should return fallback when target is true", () => {
			expect(parseToNumber(false, undefined)).toBe(undefined);
		});
		it("should return fallback when target is false", () => {
			expect(parseToNumber(true, undefined)).toBe(undefined);
		});
		it("should return default fallback when can not be parsed", () => {
			expect(parseToNumber({})).toBe(undefined);
		});
	});
	describe("Can be parsed", () => {
		it("should return target", () => {
			expect(parseToNumber(1)).toBe(1);
			expect(parseToNumber(0)).toBe(0);
			expect(parseToNumber("1")).toBe(1);
			expect(parseToNumber("0")).toBe(0);
			expect(parseToNumber(-1)).toBe(-1);
			expect(parseToNumber(-0)).toBe(0);
			expect(parseToNumber("-1")).toBe(-1);
			expect(parseToNumber("-0")).toBe(0);
		});
	});
	// it('should return fallback when target is an array', () => {
	//   expect(toNumber([], 0)).toBe(0);
	// });

	// it('should return the number when target is a valid number', () => {
	//   expect(toNumber('123')).toBe(123);
	// });

	// it('should return the number when target is a number in string form', () => {
	//   expect(toNumber('456')).toBe(456);
	// });

	// it('should return fallback when target is an invalid number', () => {
	//   expect(toNumber('abc', 0)).toBe(0);
	// });

	// it('should return fallback when target is NaN', () => {
	//   expect(toNumber(NaN, 0)).toBe(0);
	// });

	// it('should return the correct number when target is a floating point number', () => {
	//   expect(toNumber('123.45')).toBe(123.45);
	// });

	// it('should return the correct number when target is negative', () => {
	//   expect(toNumber('-123')).toBe(-123);
	// });
});
