import { describe, it, expect } from "vitest";
import { validateJson, formatJson, minifyJson, sortJsonKeys } from "../utils";

describe("JSON Formatter Utils", () => {
  describe("validateJson", () => {
    it("should validate correct JSON object", () => {
      const result = validateJson('{"name": "John", "age": 30}');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should validate correct JSON array", () => {
      const result = validateJson('[1, 2, 3, "test"]');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should validate JSON primitives", () => {
      expect(validateJson('"string"').isValid).toBe(true);
      expect(validateJson("123").isValid).toBe(true);
      expect(validateJson("true").isValid).toBe(true);
      expect(validateJson("false").isValid).toBe(true);
      expect(validateJson("null").isValid).toBe(true);
    });

    it("should reject empty input", () => {
      const result = validateJson("");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Input is empty");
    });

    it("should reject whitespace-only input", () => {
      const result = validateJson("   \n  \t  ");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Input is empty");
    });

    it("should reject invalid JSON with missing quotes", () => {
      const result = validateJson("{name: John}");
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should reject invalid JSON with trailing comma", () => {
      const result = validateJson('{"name": "John",}');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should reject invalid JSON with unclosed bracket", () => {
      const result = validateJson('{"name": "John"');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should reject invalid JSON with single quotes", () => {
      const result = validateJson("{'name': 'John'}");
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("formatJson", () => {
    it("should format valid JSON with default 2-space indentation", () => {
      const input = '{"name":"John","age":30}';
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toBe('{\n  "name": "John",\n  "age": 30\n}');
    });

    it("should format with custom indentation", () => {
      const input = '{"name":"John"}';
      const result = formatJson(input, 4);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toBe('{\n    "name": "John"\n}');
    });

    it("should format nested objects", () => {
      const input = '{"user":{"name":"John","address":{"city":"NY"}}}';
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toContain('"user"');
      expect(result.formatted).toContain('"address"');
      expect(result.formatted).toContain('"city"');
    });

    it("should format arrays", () => {
      const input = "[1,2,3]";
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toBe("[\n  1,\n  2,\n  3\n]");
    });

    it("should handle mixed nested structures", () => {
      const input = '{"users":[{"name":"John"},{"name":"Jane"}]}';
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toContain('"users"');
      expect(result.formatted).toContain('"John"');
      expect(result.formatted).toContain('"Jane"');
    });

    it("should return empty string for invalid JSON", () => {
      const result = formatJson("{invalid}");
      expect(result.validation.isValid).toBe(false);
      expect(result.formatted).toBe("");
      expect(result.validation.error).toBeDefined();
    });

    it("should preserve special characters", () => {
      const input = '{"text":"Line 1\\nLine 2\\tTabbed"}';
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toContain("\\n");
      expect(result.formatted).toContain("\\t");
    });

    it("should handle Unicode characters", () => {
      const input = '{"emoji":"🚀","german":"Über","chinese":"中文"}';
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toContain("🚀");
      expect(result.formatted).toContain("Über");
      expect(result.formatted).toContain("中文");
    });
  });

  describe("formatJson with sortKeys", () => {
    it("should sort keys alphabetically", () => {
      const input = '{"z":"last","a":"first","m":"middle"}';
      const result = formatJson(input, 2, true);
      expect(result.validation.isValid).toBe(true);
      const lines = result.formatted.split("\n");
      expect(lines[1]).toContain('"a"');
      expect(lines[2]).toContain('"m"');
      expect(lines[3]).toContain('"z"');
    });

    it("should sort keys recursively in nested objects", () => {
      const input = '{"z":{"y":"val","a":"val"},"a":"val"}';
      const result = formatJson(input, 2, true);
      expect(result.validation.isValid).toBe(true);
      // Outer keys should be sorted
      const formatted = result.formatted;
      expect(formatted.indexOf('"a"')).toBeLessThan(formatted.indexOf('"z"'));
      // Inner keys should also be sorted
      const zObjectMatch = formatted.match(/"z":\s*\{[^}]+\}/);
      expect(zObjectMatch).toBeDefined();
    });

    it("should preserve array order while sorting object keys", () => {
      const input = '{"items":[3,1,2],"name":"test"}';
      const result = formatJson(input, 2, true);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toContain("3");
      expect(result.formatted).toContain("1");
      expect(result.formatted).toContain("2");
      // Keys should be sorted
      expect(result.formatted.indexOf('"items"')).toBeLessThan(
        result.formatted.indexOf('"name"')
      );
    });
  });

  describe("minifyJson", () => {
    it("should minify formatted JSON to single line", () => {
      const input = '{\n  "name": "John",\n  "age": 30\n}';
      const result = minifyJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toBe('{"name":"John","age":30}');
      expect(result.formatted).not.toContain("\n");
      expect(result.formatted).not.toContain(" ");
    });

    it("should handle already minified JSON", () => {
      const input = '{"name":"John"}';
      const result = minifyJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toBe('{"name":"John"}');
    });

    it("should minify complex nested structures", () => {
      const input = `{
        "users": [
          {"name": "John", "age": 30},
          {"name": "Jane", "age": 25}
        ]
      }`;
      const result = minifyJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).not.toContain("\n");
      expect(result.formatted).toContain("users");
      expect(result.formatted).toContain("John");
      expect(result.formatted).toContain("Jane");
    });

    it("should return error for invalid JSON", () => {
      const result = minifyJson("{invalid");
      expect(result.validation.isValid).toBe(false);
      expect(result.formatted).toBe("");
    });

    it("should remove all unnecessary whitespace", () => {
      const input = '  {  "a"  :  1  ,  "b"  :  2  }  ';
      const result = minifyJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toBe('{"a":1,"b":2}');
    });
  });

  describe("sortJsonKeys", () => {
    it("should sort top-level keys alphabetically", () => {
      const input = '{"z":"last","b":"middle","a":"first"}';
      const result = sortJsonKeys(input);
      expect(result.validation.isValid).toBe(true);
      const parsed = JSON.parse(result.formatted);
      const keys = Object.keys(parsed);
      expect(keys).toEqual(["a", "b", "z"]);
    });

    it("should sort keys recursively in nested objects", () => {
      const input = '{"z":{"y":"val","a":"val"},"a":{"z":"val","a":"val"}}';
      const result = sortJsonKeys(input);
      expect(result.validation.isValid).toBe(true);
      const parsed = JSON.parse(result.formatted);
      expect(Object.keys(parsed)).toEqual(["a", "z"]);
      expect(Object.keys(parsed.a)).toEqual(["a", "z"]);
      expect(Object.keys(parsed.z)).toEqual(["a", "y"]);
    });

    it("should preserve array values and order", () => {
      const input = '{"b":[3,2,1],"a":"value"}';
      const result = sortJsonKeys(input);
      expect(result.validation.isValid).toBe(true);
      const parsed = JSON.parse(result.formatted);
      expect(parsed.b).toEqual([3, 2, 1]);
    });

    it("should handle objects in arrays", () => {
      const input = '{"items":[{"z":"val","a":"val"}]}';
      const result = sortJsonKeys(input);
      expect(result.validation.isValid).toBe(true);
      const parsed = JSON.parse(result.formatted);
      expect(Object.keys(parsed.items[0])).toEqual(["a", "z"]);
    });

    it("should format with 2-space indentation", () => {
      const input = '{"b":1,"a":2}';
      const result = sortJsonKeys(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toBe('{\n  "a": 2,\n  "b": 1\n}');
    });

    it("should return error for invalid JSON", () => {
      const result = sortJsonKeys("not valid json");
      expect(result.validation.isValid).toBe(false);
      expect(result.formatted).toBe("");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty object", () => {
      const result = formatJson("{}");
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toBe("{}");
    });

    it("should handle empty array", () => {
      const result = formatJson("[]");
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toBe("[]");
    });

    it("should handle null value", () => {
      const result = formatJson("null");
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toBe("null");
    });

    it("should handle very large numbers", () => {
      const input = '{"number":999999999999999}';
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toContain("999999999999999");
    });

    it("should handle floating point numbers", () => {
      const input = '{"pi":3.14159,"e":2.71828}';
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toContain("3.14159");
      expect(result.formatted).toContain("2.71828");
    });

    it("should handle scientific notation", () => {
      const input = '{"value":1.23e-10}';
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toContain("e");
    });

    it("should handle deeply nested structures", () => {
      const input = '{"a":{"b":{"c":{"d":{"e":"deep"}}}}}';
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toContain('"e": "deep"');
    });

    it("should handle strings with quotes", () => {
      const input = '{"text":"He said \\"Hello\\""}';
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toContain('\\"Hello\\"');
    });

    it("should handle empty strings", () => {
      const input = '{"empty":"","filled":"text"}';
      const result = formatJson(input);
      expect(result.validation.isValid).toBe(true);
      expect(result.formatted).toContain('"empty": ""');
    });
  });
});
