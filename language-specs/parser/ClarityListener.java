// Generated from Clarity.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link ClarityParser}.
 */
public interface ClarityListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link ClarityParser#r}.
	 * @param ctx the parse tree
	 */
	void enterR(ClarityParser.RContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#r}.
	 * @param ctx the parse tree
	 */
	void exitR(ClarityParser.RContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#whitespace}.
	 * @param ctx the parse tree
	 */
	void enterWhitespace(ClarityParser.WhitespaceContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#whitespace}.
	 * @param ctx the parse tree
	 */
	void exitWhitespace(ClarityParser.WhitespaceContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#integer}.
	 * @param ctx the parse tree
	 */
	void enterInteger(ClarityParser.IntegerContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#integer}.
	 * @param ctx the parse tree
	 */
	void exitInteger(ClarityParser.IntegerContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#string}.
	 * @param ctx the parse tree
	 */
	void enterString(ClarityParser.StringContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#string}.
	 * @param ctx the parse tree
	 */
	void exitString(ClarityParser.StringContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#identifier}.
	 * @param ctx the parse tree
	 */
	void enterIdentifier(ClarityParser.IdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#identifier}.
	 * @param ctx the parse tree
	 */
	void exitIdentifier(ClarityParser.IdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#module}.
	 * @param ctx the parse tree
	 */
	void enterModule(ClarityParser.ModuleContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#module}.
	 * @param ctx the parse tree
	 */
	void exitModule(ClarityParser.ModuleContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#accessor}.
	 * @param ctx the parse tree
	 */
	void enterAccessor(ClarityParser.AccessorContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#accessor}.
	 * @param ctx the parse tree
	 */
	void exitAccessor(ClarityParser.AccessorContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#call}.
	 * @param ctx the parse tree
	 */
	void enterCall(ClarityParser.CallContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#call}.
	 * @param ctx the parse tree
	 */
	void exitCall(ClarityParser.CallContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#value}.
	 * @param ctx the parse tree
	 */
	void enterValue(ClarityParser.ValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#value}.
	 * @param ctx the parse tree
	 */
	void exitValue(ClarityParser.ValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#type}.
	 * @param ctx the parse tree
	 */
	void enterType(ClarityParser.TypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#type}.
	 * @param ctx the parse tree
	 */
	void exitType(ClarityParser.TypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#tuple}.
	 * @param ctx the parse tree
	 */
	void enterTuple(ClarityParser.TupleContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#tuple}.
	 * @param ctx the parse tree
	 */
	void exitTuple(ClarityParser.TupleContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#tupleInstance}.
	 * @param ctx the parse tree
	 */
	void enterTupleInstance(ClarityParser.TupleInstanceContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#tupleInstance}.
	 * @param ctx the parse tree
	 */
	void exitTupleInstance(ClarityParser.TupleInstanceContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#struct}.
	 * @param ctx the parse tree
	 */
	void enterStruct(ClarityParser.StructContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#struct}.
	 * @param ctx the parse tree
	 */
	void exitStruct(ClarityParser.StructContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#structInstance}.
	 * @param ctx the parse tree
	 */
	void enterStructInstance(ClarityParser.StructInstanceContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#structInstance}.
	 * @param ctx the parse tree
	 */
	void exitStructInstance(ClarityParser.StructInstanceContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#function}.
	 * @param ctx the parse tree
	 */
	void enterFunction(ClarityParser.FunctionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#function}.
	 * @param ctx the parse tree
	 */
	void exitFunction(ClarityParser.FunctionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#assignment}.
	 * @param ctx the parse tree
	 */
	void enterAssignment(ClarityParser.AssignmentContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#assignment}.
	 * @param ctx the parse tree
	 */
	void exitAssignment(ClarityParser.AssignmentContext ctx);
	/**
	 * Enter a parse tree produced by {@link ClarityParser#ret}.
	 * @param ctx the parse tree
	 */
	void enterRet(ClarityParser.RetContext ctx);
	/**
	 * Exit a parse tree produced by {@link ClarityParser#ret}.
	 * @param ctx the parse tree
	 */
	void exitRet(ClarityParser.RetContext ctx);
}