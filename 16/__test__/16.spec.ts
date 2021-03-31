import {
  fn,
  getNextItemFromRepeatingPattern,
  createRepeatingPattern,
  part2
} from "../src";

describe("Day 0", () => {
  it("should have a helper function which provides a repeating pattern", () => {
    const repeatingPattern = getNextItemFromRepeatingPattern([1, 2, 3]);
    expect(repeatingPattern()).toBe(2);
    expect(repeatingPattern()).toBe(3);
    expect(repeatingPattern()).toBe(1);
    expect(repeatingPattern()).toBe(2);
    expect(repeatingPattern()).toBe(3);
  });

  it("should have a helper function that creates a repeating pattern", () => {
    const pattern = createRepeatingPattern(1);
    expect(pattern).toEqual([0, 1, 0, -1]);
    const pattern2 = createRepeatingPattern(2);
    expect(pattern2).toEqual([0, 0, 1, 1, 0, 0, -1, -1]);
    const pattern3 = createRepeatingPattern(3);
    expect(pattern3).toEqual([0, 0, 0, 1, 1, 1, 0, 0, 0, -1, -1, -1]);
  });

  it("should find the next pattern", () => {
    const result = fn("12345678", 1);
    expect(result).toBe("48226158");
  });

  it("should find phase 2", () => {
    const result = fn("12345678", 2);
    expect(result).toBe("34040438");
  });

  it("after 4 phases should equal 01029498", () => {
    const result = fn("12345678", 4);
    expect(result).toBe("01029498");
  });

  it("example 1", () => {
    const result = fn("80871224585914546619083218645595", 100);
    expect(result.slice(0, 8)).toBe("24176176");
  });

  it("example 2", () => {
    const result = fn("19617804207202209144916044189917", 100);
    expect(result.slice(0, 8)).toBe("73745418");
  });

  it("example 3", () => {
    const result = fn("69317163492948606335995924319873", 100);
    expect(result.slice(0, 8)).toBe("52432133");
  });

  it("puzzle 1", () => {
    const result = fn(
      "59762770781817719190459920638916297932099919336473880209100837309955133944776196290131062991588533604012789279722697427213158651963842941000227675363260513283349562674004015593737518754413236241876959840076372395821627451178924619604778486903040621916904575053141824939525904676911285446889682089563075562644813747239285344522507666595561570229575009121663303510763018855038153974091471626380638098740818102085542924937522595303462725145620673366476987473519905565346502431123825798174326899538349747404781623195253709212209882530131864820645274994127388201990754296051264021264496618531890752446146462088574426473998601145665542134964041254919435635",
      100
    );
    expect(result.slice(0, 8)).toBe("34694616");
  });

  it.skip("puzzle 2 - example 1", () => {
    const result = part2("03036732577212944063491565474664", 100);
    expect(result.slice(303673, 303673 + 8)).toBe("84462026");
  });

  it.only("puzzle 2", () => {
    // this takes 5 minutes
    const result = part2(
      "59762770781817719190459920638916297932099919336473880209100837309955133944776196290131062991588533604012789279722697427213158651963842941000227675363260513283349562674004015593737518754413236241876959840076372395821627451178924619604778486903040621916904575053141824939525904676911285446889682089563075562644813747239285344522507666595561570229575009121663303510763018855038153974091471626380638098740818102085542924937522595303462725145620673366476987473519905565346502431123825798174326899538349747404781623195253709212209882530131864820645274994127388201990754296051264021264496618531890752446146462088574426473998601145665542134964041254919435635",
      100
    );
    expect(result.slice(5976277, 5976277 + 8)).toBe("17069048");
  });
});